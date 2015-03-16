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
		route: React.PropTypes.string.isRequired,
	},
	unread: function (notification) {
		return notification.unread == 1;
	},
	render: function () {
		var handleRouteChange = this.state.handleRouteChange;
		var classSet = React.addons.classSet;
		var usersClassSet = classSet({
			'active': this.props.route == 'Users'
		});
		var softwareClassSet = classSet({
			'active': this.props.route == 'Software'
		});
		var notificationsClassSet = classSet({
			'active': this.props.route == 'Notifications'
		});
		return (
			<div className="fixed">
				<nav className="top-bar animated slideInDown" data-topbar role="navigation">
					<ul className="title-area">
						<li className='name'>
							<h1>
								<a href="#">
									PUP NLP &gt; {this.props.route}
								</a>
							</h1>
						</li>
					    <li className="toggle-topbar menu-icon"><a href="#"><span>MENU</span></a></li>
					</ul>
					<section className="top-bar-section">
						<ul className="right">
							<li className={notificationsClassSet}>
								<a href="#" onClick={handleRouteChange.bind(null, 'Notifications')}>
									Notifications &nbsp;
									<span className="round alert label">
										{notifications.filter(this.unread).length}
									</span>
								</a>
							</li>
							<li className="has-dropdown">
								<a href="#">{this.props.user.name}</a>
								<ul className="dropdown">
									{
										this.props.user.role == 1 ?
										<li><a href="/tools/create">New Tool</a></li> :
										null
									}
									<li className={softwareClassSet}>
										<a href="#software"
											onClick={handleRouteChange.bind(null, 'Software')}>
											{
												this.props.user.role == 1 ?
													'Manage Software' :
													'View Software'
											}
										</a>
									</li>
									{
										this.props.user.role == 1 ?
										<li className={usersClassSet}>
											<a href="#users"
												onClick={handleRouteChange.bind(null, 'Users')}>
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
