/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var prettyLists = require('pretty-lists');

var NotificationsList = React.createClass({
    displayName: 'NotificationsList',
    propTypes: {
        notifications: React.PropTypes.array.isRequired,
        handleNotificationClick: React.PropTypes.func.isRequired
    },
    createLi: function (notification) {
    	return (
    		<div className="panel white tool" key={notification.id}>
    			<b> {notification.doer_name} </b>
    			{prettyLists.format0(notification.verbs, 4)}
    			&nbsp;
    			<b>
    				<a href="#"
    					onClick={this.props.handleNotificationClick
    						.bind(null, notification.tool_id)}>
    					{notification.tool}
    				</a>
    			</b>. <br />
    			{moment(notification.updated_at).fromNow()}
    		</div>
    	);
    },
    render: function () {
        return (
        	<div className="column small-12 animated fadeInDown">
	            <div className="panel white">
	            	<h1>Notifications</h1>
            		{this.props.notifications.map(this.createLi, this)}
	           	</div>
           	</div>
        );
    }
});

module.exports = NotificationsList;
