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
			route: window.location.hash || '#software',
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
	handleToolClick: function (notification, toolId) {
		this.handleNotificationClick(notification);

		this.setState({
			route: 'Software',
			toolId: toolId
		});
	},
	handleNotificationClick: function (notification) {
		notifications.shift(notification);
		$.post('notifications/read', {id: notification.id});

		this.setState({notifications: notifications});
	},
	handleNotificationsClick: function (notifs) {
		notifs.forEach(function (notification) {
			notifications.shift(notification);
			$.post('notifications/read', {id: notification.id});
		});

		this.setState({notifications: notifications});
	},
	setModalContents: function (title, contents) {
		this.setState({modalTitle: title, modalContents: contents});
	},
	render: function () {

		var items;

		var route = this.state.route.split('/');

		switch(route[0]) {
			case '#users':
				items = users;
				break;
			case '#notifications':
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
		switch(route[0]) {
			case '#users':
				page = <UsersList users={queriedItems}
					pageLength={5} page={route[1]}
					setModalContents={this.setModalContents}/>;
				break;
			case '#notifications':
				page = <NotificationsList notifications={queriedItems}
					handleToolClick={this.handleToolClick}
					handleNotificationClick={this.handleNotificationClick}
					handleNotificationsClick={this.handleNotificationsClick}
					setModalContents={this.setModalContents}
					pageLength={5}
					page={route[1]}/>;
				break;
			default:
				page = <ToolsList tools={queriedItems} pageLength={5}
					setModalContents={this.setModalContents}
					toolId={route[1] || this.state.toolId}/>;
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
