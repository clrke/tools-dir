/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var prettyLists = require('pretty-lists');

var NotificationsList = React.createClass({
    displayName: 'NotificationsList',
    createLi: function (notification) {
    	return (
    		<div className="panel white tool" key={notification.id}>
    			<b> {notification.doer_name} </b>
    			{prettyLists.format0(notification.verbs, 4)}
    			<b> {notification.tool} </b>. <br />
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
