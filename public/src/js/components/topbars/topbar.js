var React = require('react/addons');

TopBar = React.createClass({
	propTypes: {
		handleSearch: React.PropTypes.func,
		user: React.PropTypes.object,
	},
	render: function () {
		return (
			<div className="fixed">
				<nav className="top-bar" data-topbar role="navigation">
					<ul className="title-area">
						<li className="name">
							<h1><a href="#">PUP NLP &gt; Software</a></h1>
						</li>
					    <li className="toggle-topbar menu-icon"><a href="#"><span>MENU</span></a></li>
					</ul>
					<section className="top-bar-section">
						<ul className="right">
							<li className="has-dropdown">
								<a href="#">{this.props.user.name}</a>
								<ul className="dropdown">
									<li><a href="#">Submit Paper</a></li>
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
