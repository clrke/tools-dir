var React = require('react/addons');

module.exports = React.createClass({
	render: function () {
		return (
			<div className="fixed">
				<nav className="top-bar" data-topbar role="navigation">
					<ul className="title-area">
						<li className="name">
							<h1><a href="#">Thesis Papers Directory</a></h1>
						</li>
					    <li className="toggle-topbar menu-icon"><a href="#"><span>MENU</span></a></li>
					</ul>
					<section className="top-bar-section">
						<ul className="right">
							<li className="has-dropdown">
								<a href="#">Clarke Benedict Plumo</a>
								<ul className="dropdown">
									<li><a href="#">Submit Paper</a></li>
									<li><a href="/logout">Log Out</a></li>
								</ul>
							</li>
						</ul>

						<ul className="left">
							<li>
								<input type="text" placeholder="Search query" ng-model="search" />
							</li>
						</ul>
					</section>
				</nav>
			</div>
		);
	}
});
