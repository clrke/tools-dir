var React = require('react');

var TopBar = require('./topbars/topbar');
var ToolsList = require('./tools/tools-list');
var UsersList = require('./users/users-list');

var MainPage = React.createClass({
	getInitialState: function () {
		return { query: '', route: '' };
	},
	handleSearch: function (event) {
		this.setState({query: event.target.value});
	},
	handleRouteChange: function (route) {
		this.setState({route: route});
	},
	render: function () {
		var page;

		var query = this.state.query;
		var queriedTools = tools.filter(function (tool) {
			for(var key in tool) {
				if(tool[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
					return true;
			}
			return false;
		});

		switch(this.state.route) {
			case 'users':
				page = <UsersList/>;
				break;
			default:
				page = <ToolsList tools={queriedTools} pageLength={5}/>;
				break;
		}

		return (
			<div>
				<TopBar user={authUser}
					handleSearch={this.handleSearch}
					handleRouteChange={this.handleRouteChange}/>
				{page}
			</div>
		)
	}
});

React.render(
	<MainPage />,
	document.body
);

$(document).foundation();
