var React = require('react/addons');

TableRow = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired
	},
	shorten: function (string) {
		if(string.length > 100) {
			return string.substr(0, 100) + "...";
		}
		else {
			return string;
		}
	},
	render: function () {
		var tool = this.props.tool;
		return (
			<tr>
				<td>
					<h5><a href="#"><b>{tool.title}</b></a></h5>
					<p className="subheader"> {this.shorten(tool.abstract)} </p>
				</td>
				<td> {tool.authors} </td>
				<td> {tool.pageCount} </td>
				<td> {tool.created_at} </td>
			</tr>
		)
	}
});

module.exports = TableRow;
