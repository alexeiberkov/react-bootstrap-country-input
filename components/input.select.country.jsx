/*global React, Input, $, jQuery*/

const InputCountrySelect = React.createClass({

    propTypes: {
        label: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        countryAPI: React.PropTypes.string,
        defaultCountryCode: React.PropTypes.string,
        firstEmptyRow: React.PropTypes.bool,
        onCountryChanged: React.PropTypes.func,
        countries: React.PropTypes.array,
        language: React.PropTypes.oneOf(['de', 'es', 'fr', 'ja', 'it', 'en'])
    },

    getDefaultProps: function () {
        return {
            label: 'Country',
            placeholder: 'Select country',
            countryAPI: 'https://restcountries.eu/rest/v1/all',
            firstEmptyRow: true,
            onCountryChanged: function (selectedCountry) {
            },
            countries: [],
            language: 'en'
        };
    },

    getInitialState: function () {
        return {
            isLoading: false,
            countries: this.props.countries,
            defaultCountryCode: this.props.defaultCountryCode
        };
    },

    loadCountriesFromServer: function () {
        $.ajax({
            url: this.props.countryAPI,
            dataType: 'json',
            cache: false,
            success: function (countries) {
                this.setState({
                    countries: countries,
                    isLoading: false
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.countryAPI, status, err.toString());
            }.bind(this)
        });
    },

    handleChange: function (e) {
        e.preventDefault();
        var countryCode = this.refs.app_country.getValue();
        var selectedCountry, translatedName, countryData;

        this.setState({defaultCountryCode: countryCode});

        if(countryCode === '0') {
            countryData = {
                name: null,
                translatedName: null,
                alpha3Code: null
            };
        } else {
            selectedCountry = this.findCountryByCode(countryCode);
            translatedName = selectedCountry.translations[this.props.language] ? selectedCountry.translations[this.props.language] : selectedCountry.name;
            countryData = {
                name: selectedCountry.name,
                translatedName: translatedName,
                alpha3Code: selectedCountry.alpha3Code
            };
        }

        this.props.onCountryChanged(countryData);
    },

    findCountryByCode: function(countryCode) {
        return this.state.countries.find(function (country) {
            return country.alpha3Code === countryCode;
        });
    },

    componentDidMount: function () {
        if (this.props.countries.length == 0) {
            this.setState({isLoading: true});

            this.loadCountriesFromServer();
        }
    },

    render: function () {
        var self = this;
        var сountriesNodes = this.state.countries.map(function (country) {
            var countryName = country.translations[self.props.language] ? country.translations[self.props.language] : country.name;
            return (
                <option value={country.alpha3Code} key={country.alpha3Code}>{countryName}</option>
            );
        });

        if (this.props.firstEmptyRow) {
            var firstEmptyRow = (<option value="0" key="Atlantis"></option>);
            сountriesNodes.unshift(firstEmptyRow);
        }

        return (
            <Input type="select"
                   label={this.props.label}
                   placeholder={this.props.placeholder}
                   disabled={this.state.isLoading}
                   onChange={this.handleChange}
                   value={this.state.defaultCountryCode}
                   ref="app_country"
            >
                {сountriesNodes}
            </Input>
        );
    }
});
