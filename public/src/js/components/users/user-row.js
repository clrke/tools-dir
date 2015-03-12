var React = require('react');
var prettyLists = require('pretty-lists');

var UserRow = React.createClass({
	getInitialState: function () {
		return {};
	},
	propTypes: {
		user: React.PropTypes.object.isRequired,
		setModalContents: React.PropTypes.func.isRequired
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
	createLi: function (item, i) {
		return <li key={i}> {item} </li>
	},
	modalPresentable: function (items, attr1, attr2) {
		var items2 = prettyLists.getItemsDisplay(items, attr1, attr2);
		return items2.map(this.createLi, this);
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
				<td>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							'Votes', this.modalPresentable(
								user.upvotes, 'title'))}>
						{user.upvotes.length||''}
					</a>
				</td>
				<td>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							'Views', this.modalPresentable(
								user.tools_viewed, 'title'))}>
						{user.tools_viewed.length||''}
					</a>
				</td>
				<td>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							'Downloads', this.modalPresentable(
								user.tools_downloaded, 'title'))}>
						{user.tools_downloaded.length||''}
					</a>
				</td>
				<td>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							'Comments', this.modalPresentable(
								user.tools_commented, 'title'))}>
						{user.tools_commented.length||''}
					</a>
				</td>
				<td> {user.created_at} </td>
				<td> {roleChangeButton} </td>
				<td> {acceptButton} </td>
			</tr>
		);
	}
});

module.exports = UserRow;
