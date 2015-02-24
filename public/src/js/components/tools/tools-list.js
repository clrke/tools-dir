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
			return <ToolPanel tool={tool} onClick={this.setCurrentTool.bind(this, tool)}/>
		}
		return (
			<div>
				<div className="column medium-6 medium-push-6">
					<div className="panel radius white">
						<h3>{this.state.tool.title}</h3>
						<p> {this.state.tool.abstract} </p>
						<ToolStats tool={this.state.tool}/>
					</div>
				</div>
				<div className="column medium-pull-6 medium-6 fixed-container">
					<div>
						{this.props.tools.map(createTr, this)}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ToolsList;
