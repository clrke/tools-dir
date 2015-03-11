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
		return (
			<tr>
				<td> {user.id} </td>
				<td> {user.username} </td>
				<td> {user.name} </td>
				<td> {prettyLists.format1(user.upvotes, 'title')} </td>
				<td> {prettyLists.format2(user.tools_viewed, 'title', 'pivot.count')} </td>
				<td> {prettyLists.format1(user.tools_commented, 'title')} </td>
				<td> {user.created_at} </td>
				<td> {roleChangeButton} </td>
			</tr>
		);
	}
});

module.exports = UserRow;
