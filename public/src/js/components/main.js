var React = require('react');

var TopBar = require('./topbars/topbar');
var ToolsList = require('./tools/tools-list');

var MainPage = React.createClass({
	getInitialState: function () {
		return { query: '' };
	},
	handleSearch: function (event) {
		this.setState({query: event.target.value});
	},
	render: function () {
		var query = this.state.query;
		var queriedTools = tools.filter(function (tool) {
			for(var key in tool) {
				if(tool[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
					return true;
			}
			return false;
		});
		return (
			<div>
				<TopBar handleSearch={this.handleSearch}/>
				<ToolsList tools={queriedTools} pageLength={5}/>
			</div>
		)
	}
});

React.render(
	<MainPage />,
	document.body
);

$(document).foundation();
