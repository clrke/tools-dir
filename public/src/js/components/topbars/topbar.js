var React = require('react/addons');

TopBar = React.createClass({
	getInitialState: function () {
		return {
			handleSearch: this.props.handleSearch,
			handleRouteChange: this.props.handleRouteChange
		};
	},
	propTypes: {
		handleSearch: React.PropTypes.func,
		handleRouteChange: React.PropTypes.func.isRequired,
		user: React.PropTypes.object,
	},
	render: function () {
		var handleRouteChange = this.state.handleRouteChange;

		return (
			<div className="fixed">
				<nav className="top-bar" data-topbar role="navigation">
					<ul className="title-area">
						<li className="name">
							<h1>
								<a href="#"
									onClick={handleRouteChange.bind(null, '')}>
									PUP NLP &gt; Software
								</a>
							</h1>
						</li>
					    <li className="toggle-topbar menu-icon"><a href="#"><span>MENU</span></a></li>
					</ul>
					<section className="top-bar-section">
						<ul className="right">
							<li className="has-dropdown">
								<a href="#">{this.props.user.name}</a>
								<ul className="dropdown">
									{
										this.props.user.role == 1 ?
										<li><a href="#">New Tool</a></li> :
										null
									}
									{
										this.props.user.role == 1 ?
										<li>
											<a href="#users"
												onClick={handleRouteChange.bind(null, 'users')}>
												Manage Users
											</a>
										</li> :
										null
									}
									<li><a href="/logout">Log Out</a></li>
								</ul>
							</li>
						</ul>

						<ul className="left">
							<li>
								<input type="text" placeholder="Search query"
									onChange={this.props.handleSearch}/>
							</li>
						</ul>
					</section>
				</nav>
			</div>
		);
	}
});

module.exports = TopBar;
