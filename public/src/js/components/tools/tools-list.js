var React = require('react/addons');
var ToolPanel = require('./tool-panel');

var ToolStats = require('./tool-stats');

ToolsList = React.createClass({
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
			return (
				<ToolPanel
					key={tool.id}
					tool={tool}
					highlight={this.state.tool == tool}
					onClick={this.setCurrentTool.bind(this, tool)}/>
			);
		}
		return (
			<div>
				<div className="column medium-6 medium-push-6">
					<ToolPanel
						tool={this.state.tool}
						key={this.state.tool.id}
						current={true}
						onClick={this.setCurrentTool.bind(this, this.state.tool)}/>
				</div>
				<div className="column medium-pull-6 medium-6 fixed-container">
					{this.props.tools.map(createTr, this)}
				</div>
			</div>
		);
	}
});

module.exports = ToolsList;
