var React = require('react');

var Modal = require('./modals/modal');

var TopBar = require('./topbars/topbar');
var ToolsList = require('./tools/tools-list');
var UsersList = require('./users/users-list');
var NotificationsList = require('./notifications/notifications-list');

var MainPage = React.createClass({
	getInitialState: function () {
		return {
			query: '',
			route: 'Software',
			modalTitle: '',
			modalContents: []
		};
	},
	handleSearch: function (event) {
		this.setState({query: event.target.value});
	},
	handleRouteChange: function (route) {
		this.setState({route: route});
	},
	handleNotificationClick: function (toolId) {
		console.log(toolId);
		this.setState({
			route: 'Software',
			toolId: toolId
		});
	},
	setModalContents: function (title, contents) {
		this.setState({modalTitle: title, modalContents: contents});
	},
	render: function () {

		var items;

		switch(this.state.route) {
			case 'Users':
				items = users;
				break;
			case 'Notifications':
				items = notifications;
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
			case 'Users':
				page = <UsersList users={queriedItems} pageLength={5}
					setModalContents={this.setModalContents}/>;
				break;
			case 'Notifications':
				page = <NotificationsList notifications={queriedItems}
					handleNotificationClick={this.handleNotificationClick}
					pageLength={5} />;
				break;
			default:
				page = <ToolsList tools={queriedItems} pageLength={5}
					setModalContents={this.setModalContents}
					toolId={this.state.toolId}/>;
				break;
		}

		return (
			<div>
				<TopBar user={authUser}
					handleSearch={this.handleSearch}
					handleRouteChange={this.handleRouteChange}
					route={this.state.route}/>
				<Modal title={this.state.modalTitle}
					contents={this.state.modalContents}/>
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
