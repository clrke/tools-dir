var React = require('react');

var UsersList = React.createClass({
	getInitialState: function () {
		return {};
	},
	propTypes: {
		users: React.PropTypes.array.isRequired
	},
	render: function () {
		return (
			<div className="column small-12">
				<div className="panel white">
					<h1>Users</h1>
				</div>
			</div>
		)
	}
});

module.exports = UsersList;
