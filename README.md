# react-bootstrap-country-input
Simple React-Bootstrap component for country selection.

### Requirements
This component depends on [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap) [Input](https://react-bootstrap.github.io/components.html#input) component. It assumes you have React and React-Bootstrap vendors are included into your application. 

### Installation
Download [input.select.country.jsx](https://github.com/alexeiberkov/react-bootstrap-country-input/blob/master/components/input.select.country.jsx) file and include it into your sources. Pay attention it is a ReactJS component made with JSX syntax.

### Demo & Examples
1. Clone the repo with command 
_git clone https://github.com/alexeiberkov/react-bootstrap-country-input.git_
2. You do not need any server side to estimate an example. Just go to cloned directory and open index.html at your favorite browser. 
3. After the page loads you should see a demo application with used react-bootstrap-country-input inside.

![demo](https://monosnap.com/file/lKpI017Pgr6S3DdCtpcbGNwLW3etI6.png)

### Country model and external API
As a country provider this component use REST API provided by https://restcountries.eu/. I would like to say thank you for [Fayder](https://github.com/fayder) for such perfect REST countries provider.
When user select any country from the list the component call callback function named `onCountryChanged`. Inside this function you have access to the country model. This model contains next fields:
- `alpha3Code` (think about it as ID)
- `name`
- `translatedName`

If you wana use some raw array instead of API call you can provide such array of models assuming that models should contain afore-mentioned fields.


### Further options
Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
	label	|	string	|	'Country'	|	text to display for label
	placeholder	|	string	|	'Select country'		|	placeholder to display inside input box
	countryAPI 	|	string	|	'https://restcountries.eu/rest/v1/all'	|	function to call to get countries
	defaultCountryCode 	|	string	|	undefined		|	default country code to select
	firstEmptyRow 	|	bool	|	true	|	whether show empty row as input value
	onCountryChanged	|	func	|	empty function	|	method executed when user select any country from the list: `function(countryModel)`
	countries	|	array	|	[]	|	instead of countryAPI you can provide a list of countries as an array
	language	|	array	|	'en'	|	you can set a language for translation when you use countries API. Available translations are : `de, es, fr, ja, it, en` 