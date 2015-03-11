var React = require('react');
var prettyLists = require('pretty-lists');

var UsersList = React.createClass({
	getInitialState: function () {
		return {};
	},
	propTypes: {
		users: React.PropTypes.array.isRequired
	},
	handleRoleChange: function () {
		this.role = !this.role;
		this.setState();
	},
	createTr: function (user) {
		return (
			<tr key={user.id}>
				<td> {user.id} </td>
				<td> {user.username} </td>
				<td> {prettyLists.format1(user.upvotes, 'title')} </td>
				<td> {prettyLists.format2(user.tools_viewed, 'title', 'pivot.count')} </td>
				<td> {prettyLists.format1(user.tools_commented, 'title')} </td>
				<td> {user.created_at} </td>
				<td>
					<button className="button secondary"
						onClick={this.handleRoleChange.bind(this)}>
						{user.role == 1? <b>Admin</b> : 'User'}
					</button>
				</td>
			</tr>
		);
	},
	render: function () {
		return (
			<div className="column small-12">
				<div className="panel white">
					<h1>Users</h1>
					<table>
						<thead>
							<th> Id </th>
							<th> Username </th>
							<th> Votes </th>
							<th> Views </th>
							<th> Comments </th>
							<th> Registration </th>
							<th> Role </th>
						</thead>
						<tbody>
							{this.props.users.map(this.createTr, this)}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
});

module.exports = UsersList;
