var React = require('react/addons');
var TableRow = require('./table-row');

ToolsTable = React.createClass({
	getInitialState: function () {
		return {tools: this.props.tools, tool: this.props.tools[0]};
	},
	propTypes: {
		tools: React.PropTypes.array,
	},
	setCurrentTool: function (tool) {
		this.setState({tool: tool});
	},
	render: function () {
		var createTr = function (tool) {
			return <TableRow tool={tool} onClick={this.setCurrentTool.bind(this, tool)}/>
		}
		return (
			<div className="row">
				<div className="column small-8">
					<table>
						<thead>
							<tr>
								<th width="650"> Tool </th>
								<th width="250"> Author(s) </th>
								<th width="150"> Page Count </th>
								<th width="250"> Date of Submission </th>
							</tr>
						</thead>
						<tbody>
							{this.props.tools.map(createTr, this)}
						</tbody>
					</table>
				</div>
				<div className="column small-4">
					{this.state.tool.title}
				</div>
			</div>
		);
	}
});

module.exports = ToolsTable;
