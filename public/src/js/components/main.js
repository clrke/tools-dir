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

		var items;

		switch(this.state.route) {
			case 'users':
				items = users;
				break;
			default:
				items = tools;
				break;
		}

		var query = this.state.query;

		var queriedItems = items.filter(function (item) {
			for(var key in item) {
				if(item[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
					return true;
			}
			return false;
		});

		var page;
		switch(this.state.route) {
			case 'users':
				page = <UsersList users={queriedItems} pageLength={5}/>;
				break;
			default:
				page = <ToolsList tools={queriedItems} pageLength={5}/>;
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
