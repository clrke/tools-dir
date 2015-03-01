var React = require('react');

var TopBar = require('./topbars/topbar');
var ToolsList = require('./tools/tools-list');

var MainPage = React.createClass({
	render: function () {
		return (
			<div>
				<TopBar />
				<ToolsList tools={tools} pageLength={5}/>
			</div>
		)
	}
});

React.render(
	<MainPage />,
	document.body
);

$(document).foundation();
