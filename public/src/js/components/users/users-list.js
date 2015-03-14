var React = require('react');
var UserPanel = require('./user-row');
var prettyLists = require('pretty-lists');

var UsersList = React.createClass({
	getInitialState: function () {
		return {};
	},
	propTypes: {
		users: React.PropTypes.array.isRequired,
		setModalContents: React.PropTypes.func.isRequired
	},
	createTr: function (user) {
		return <UserPanel user={user} key={user.id}
				setModalContents={this.props.setModalContents}/>
	},
	render: function () {
		return (
			<div className="column small-12">
				<div className="panel white">
					<h1>Users</h1>
					<table>
						<thead>
							<tr>
								<th> Id </th>
								<th> Username </th>
								<th> Gender </th>
								<th> Occupation </th>
								<th> Votes </th>
								<th> Views </th>
								<th> Downloads </th>
								<th> Comments </th>
								<th> Registration </th>
								<th> Role </th>
								<th> Registration Status </th>
							</tr>
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
