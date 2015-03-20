var React = require('react');
var UserPanel = require('./user-row');
var prettyLists = require('pretty-lists');

var Pagination = require('../pagination/pagination');

var UsersList = React.createClass({
	getInitialState: function () {
		return {page: 1, pageChange: 0};
	},
	propTypes: {
		users: React.PropTypes.array.isRequired,
		pageLength: React.PropTypes.number,
		setModalContents: React.PropTypes.func.isRequired
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
	createTr: function (user) {
		return <UserPanel user={user} key={user.id}
				setModalContents={this.props.setModalContents}/>
	},
	render: function () {
		var pageCount = Math.ceil(this.props.users.length/this.props.pageLength);

		return (
			<div className="column small-12 animated fadeInLeft">
				<div className="panel white">
					<Pagination
						prev={this.handlePrev}
						next={this.handleNext}
						skip={this.handleSkip}
                        route="#users"
						page={this.state.page}
						pageCount={pageCount}/>
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

							{this.props.users.slice(
								this.props.pageLength*(this.state.page-1),
								this.props.pageLength*this.state.page
							).map(this.createTr, this)}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
});

module.exports = UsersList;
