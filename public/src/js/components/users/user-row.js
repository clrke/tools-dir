var React = require('react');
var prettyLists = require('pretty-lists');

var UserRow = React.createClass({
	getInitialState: function () {
		return {};
	},
	propTypes: {
		user: React.PropTypes.object.isRequired
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
				<button className="button primary"
					onClick={this.handleRoleChange}>
					Admin
				</button>
			) : (
				<button className="button secondary"
					onClick={this.handleRoleChange}>
					User
				</button>
			)
		var acceptButton = user.accepted == 1? (
				<button className="button success"
					onClick={this.handleAccept}>
					Accepted
				</button>
			) : (
				<button className="button secondary"
					onClick={this.handleAccept}>
					Pending
				</button>
			)
		return (
			<tr>
				<td> {user.id} </td>
				<td> {user.username} </td>
				<td> {user.name} </td>
				<td> {user.email} </td>
				<td> {user.upvotes.length||''} </td>
				<td> {user.tools_viewed.length||''} </td>
				<td> {user.tools_downloaded.length||''} </td>
				<td> {user.tools_commented.length||''} </td>
				<td> {user.created_at} </td>
				<td> {roleChangeButton} </td>
				<td> {acceptButton} </td>
			</tr>
		);
	}
});

module.exports = UserRow;
