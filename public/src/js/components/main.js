var React = require('react');

var TopBar = require('./topbars/topbar');
var ToolsTable = require('./tables/tools-table');

var MainPage = React.createClass({
	render: function () {
		return (
			<div>
				<TopBar />
				<ToolsTable />
			</div>
		)
	}
});

React.render(
	<MainPage />,
	document.body
);
