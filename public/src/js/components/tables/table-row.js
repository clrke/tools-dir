var React = require('react/addons');

TableRow = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired
	},
	render: function () {
		var tool = this.props.tool;
		return (
			<tr>
				<td> {tool.title} </td>
				<td> {tool.authors} </td>
				<td> {tool.pageCount} </td>
				<td> {tool.created_at} </td>
			</tr>
		)
	}
});

module.exports = TableRow;
