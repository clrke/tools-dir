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
	handleRoleChange: function () {
		var user = this.props.user;

		user.role = (parseInt(user.role)+1)%2;

		$.post('/user/update/'+user.id, {role: user.role});
		this.forceUpdate();
	},
	handleAccept: function () {
		var user = this.props.user;

		user.accepted = (parseInt(user.accepted)+1)%2;

		$.post('/user/update/'+user.id, {accepted: user.accepted});
		this.forceUpdate();
	},
    render: function () {
		var user = this.props.user;
		var roleChangeButton = user.role == 1? (
				<button className="button primary margin-fix"
					onClick={this.handleRoleChange}>
					Admin
				</button>
			) : (
				<button className="button secondary margin-fix"
					onClick={this.handleRoleChange}>
					User
				</button>
			)
		var acceptButton = user.accepted == 1? (
				<button className="button success margin-fix"
					onClick={this.handleAccept}>
					Accepted
				</button>
			) : (
				<button className="button secondary margin-fix"
					onClick={this.handleAccept}>
					Pending
				</button>
			)
		return (
			<div>
				<hr />
				{user.gender} <i className="fa fa-ellipsis-v" />
				{user.email} <i className="fa fa-ellipsis-v" />
				{user.occupation} <i className="fa fa-ellipsis-v" />
				{user.affiliation}
				<hr />
				{roleChangeButton} {acceptButton}
				<hr />
				{this.getAbout()}
			</div>
		);
    }
});

module.exports = UserModalContents;
