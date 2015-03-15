/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var prettyLists = require('pretty-lists');

var Pagination = require('../pagination/pagination');

var NotificationsList = React.createClass({
    displayName: 'NotificationsList',
    getInitialState: function () {
        return {
            page: 1,
        };
    },
    propTypes: {
        notifications: React.PropTypes.array.isRequired,
        pageLength: React.PropTypes.number,
        handleToolClick: React.PropTypes.func.isRequired,
        handleNotificationClick: React.PropTypes.func.isRequired,
        handleNotificationsClick: React.PropTypes.func.isRequired,
    },
    handlePrev: function () {
        this.setState({page: this.state.page-1, pageChange: -1});
    },
    handleNext: function () {
        this.setState({page: this.state.page+1, pageChange: 1});
    },
    handleSkip: function (page) {
        this.setState({page: page, pageChange: page-this.state.page});
    },
    createLi: function (notification) {
    	return (
    		<div className="panel white tool animated fadeIn" key={notification.id}>
    			<b> {notification.doer_name} </b>
    			{prettyLists.format0(notification.verbs, 4)}
    			&nbsp;
    			<b>
    				<a href="#"
    					onClick={this.props.handleToolClick
    						.bind(null, notification, notification.tool_id)}>
    					{notification.tool}
    				</a>
    			</b>. <br />
                {moment(notification.updated_at).fromNow()}
                &nbsp;
                [
                    <a href="#"
                        onClick={this.props.handleNotificationClick
                            .bind(null, notification)}>
                        mark as read
                    </a>
                ]
    		</div>
    	);
    },
    render: function () {
        var pageCount = Math.ceil(this.props.notifications.length/this.props.pageLength);
        var pageNotifications = this.props.notifications.slice(
            this.props.pageLength*(this.state.page-1),
            this.props.pageLength*this.state.page
        );

        return (
        	<div className="column small-12 animated fadeInDown">
	            <div className="panel white">
                    <Pagination
                        prev={this.handlePrev}
                        next={this.handleNext}
                        skip={this.handleSkip}
                        page={this.state.page}
                        pageCount={pageCount}/>

                    <button className="button small primary margin-fix"
                        onClick={this.props.handleNotificationsClick
                            .bind(null, pageNotifications)}>
                        Mark All as Read
                    </button>

                    {pageNotifications.map(this.createLi, this)}
	           	</div>
           	</div>
        );
    }
});

module.exports = NotificationsList;
