/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var prettyLists = require('pretty-lists');

var UserModalContents = require('../modals/user-modal-contents');

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
        setModalContents: React.PropTypes.func.isRequired,
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
    profile: function profile(user) {
        return (
            <UserModalContents user={user} />
        );
    },
    getUser: function getUser (user_id) {
        for (var i = users.length - 1; i >= 0; i--) {
            if(users[i].id == user_id) {
                return users[i];
            }
        };
    },
    createLi: function (notification) {
        var classNames = React.addons.classSet({
            "panel tool animated fadeIn": true,
            "white": notification.registration_id == 0,
            "callout": notification.registration_id != 0
        });

        var user = this.getUser(notification.user_id);

    	return (
    		<div className={classNames} key={notification.id}>
    			<b>
                    <a data-reveal-id="myModal"
                        onClick={this.props.setModalContents.bind(null,
                            <h2> {user.name} <small>{user.username}</small> </h2>,
                            this.profile(user))}>
                        {notification.doer.name}
                    </a>
                </b>&nbsp;
    			{prettyLists.format0(notification.verbs, 4)}
                {
                    notification.tool != null ? (
            			' '
                    ) : null
                }
                {
                    notification.tool != null ? (
                        <b>
                            <a href="#"
                                onClick={this.props.handleToolClick
                                    .bind(null, notification, notification.tool_id)}>
                                {notification.tool.title}
                            </a>
                        </b>
                    ) : null
                }
                . <br />
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

        if(pageNotifications.length) {
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
        } else {
            return (
                <div className="column small-12 animated fadeInDown">
                    <div className="panel white">
                        <h1> No notifications </h1>
                    </div>
                </div>
            );
        }
    }
});

module.exports = NotificationsList;
