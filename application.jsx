/*global React, ReactDOM, InputCountrySelect, ReactBootstrap*/

const DemoApplication = React.createClass({
    getInitialState: function () {
        return {
            firstCountrySelected: false,
            secondCountrySelected: false,
            secondDefaultCountryCode: 'BLR'
        };
    },

    onFirstCountryChanged: function (selectedCountry) {
        this.setState({firstCountrySelected: selectedCountry});
        console.log('You have selected first country ', selectedCountry);
    },

    onSecondCountryChanged: function (selectedCountry) {
        this.setState({secondCountrySelected: selectedCountry});
        console.log('You have selected second country ', selectedCountry);
    },

    maybeShowAlertForFirstCountry: function () {
        if (this.state.firstCountrySelected && this.state.firstCountrySelected.translatedName) {
            return (
                <Well bsStyle="info">
                    Hey, you have just selected <strong>{this.state.firstCountrySelected.translatedName}</strong>
                </Well>
            );
        }
    },

    maybeShowAlertForSecondCountry: function () {
        if (this.state.secondCountrySelected && this.state.secondCountrySelected.translatedName) {
            return (
                <Well bsStyle="info">
                    Hey, you have just selected <strong>{this.state.secondCountrySelected.translatedName}</strong>
                </Well>
            );
        }
    },

    render: function () {
        var divStyle = {
            width: '400'
        };

        return (
            <div style={divStyle}>
                <Panel header="Here is a country selector with custom data provider:">
                    {this.maybeShowAlertForFirstCountry()}

                    <InputCountrySelect language="de"
                                        countries={this.props.customCountriesData}
                                        onCountryChanged={this.onFirstCountryChanged}
                    />
                </Panel>


                <Panel header="Here is a country selector filled with data loaded from https://restcountries.eu :">
                    {this.maybeShowAlertForSecondCountry()}

                    <InputCountrySelect language="en"
                                        firstEmptyRow={false}
                                        defaultCountryCode={this.state.secondDefaultCountryCode}
                                        onCountryChanged={this.onSecondCountryChanged}
                    />
                </Panel>

            </div>
        )
    }
});