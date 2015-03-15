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
        handleNotificationClick: React.PropTypes.func.isRequired
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
    		<div className="panel white tool" key={notification.id}>
    			<b> {notification.doer_name} </b>
    			{prettyLists.format0(notification.verbs, 4)}
    			&nbsp;
    			<b>
    				<a href="#"
    					onClick={this.props.handleNotificationClick
    						.bind(null, notification, notification.tool_id)}>
    					{notification.tool}
    				</a>
    			</b>. <br />
    			{moment(notification.updated_at).fromNow()}
    		</div>
    	);
    },
    render: function () {
        var pageCount = Math.ceil(this.props.notifications.length/this.props.pageLength);
        return (
        	<div className="column small-12 animated fadeInDown">
	            <div className="panel white">
                    <Pagination
                        prev={this.handlePrev}
                        next={this.handleNext}
                        skip={this.handleSkip}
                        page={this.state.page}
                        pageCount={pageCount}/>

                        {this.props.notifications.slice(
                            this.props.pageLength*(this.state.page-1),
                            this.props.pageLength*this.state.page
                        ).map(this.createLi, this)}
	           	</div>
           	</div>
        );
    }
});

module.exports = NotificationsList;
