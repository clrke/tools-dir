/** @jsx React.DOM */
var React = require('react');

var UserModalContents = React.createClass({
    displayName: 'UserModalContents',
    propTypes: {
    	user: React.PropTypes.object.isRequired
    },
	createParagraph: function (paragraph, i) {
		return <p key={i}> {paragraph} </p>;
	},
	getAbout: function () {
		var user = this.props.user;
			return user.about.split('\n')
				.map(this.createParagraph, this);
	},
    render: function () {
		var user = this.props.user;
		return (
			<div>
				<hr />
				{user.gender} <i className="fa fa-ellipsis-v" />
				{user.email} <i className="fa fa-ellipsis-v" />
				{user.occupation} <i className="fa fa-ellipsis-v" />
				{user.affiliation}
				<hr />
				{this.getAbout()}
			</div>
		);
    }
});

module.exports = UserModalContents;
