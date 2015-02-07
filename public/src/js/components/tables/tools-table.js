var React = require('react/addons');
var TableRow = require('./table-row');

ToolsTable = React.createClass({
	getInitialState: function () {
		return {tools: this.props.tools};
	},
	propTypes: {
		tools: React.PropTypes.array,
		years: React.PropTypes.number
	},
	render: function () {
		var createTr = function (tool) {
			return <TableRow tool={tool} />
		}
		return (
			<div className="row">
				<table>
					<thead>
						<tr>
							<th width="450"> Title </th>
							<th width="250"> Authors </th>
							<th width="150"> Page Count </th>
							<th width="250"> Actions </th>
						</tr>
					</thead>
					<tbody ng-repeat="year in years">
						<tr>
							<td colspan="4"> <h3><u> {years} </u></h3> </td>
						</tr>
						{this.props.tools.map(createTr)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = ToolsTable;
