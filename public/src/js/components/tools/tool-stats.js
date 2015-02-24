var React = require('react/addons');
var prettyLists = require('pretty-lists/pretty-lists');

ToolStats = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired
	},
	getVoters: function (isPositive) {
		var tool = this.props.tool;
		if(isPositive) {
			return tool.upvoters;
		} else {
			return tool.downvoters;
		}
	},
	getComments: function () {
		return 0;
	},
	render: function () {
		return (
			<div className="panel small-padding">
				<div className="row">
					<span className="column small-4 tool-info">
						<i className="foundicon-thumb-up blue"> </i>
						{prettyLists.format1(this.getVoters(true), 'username')}
					</span>
					<span className="column small-4 tool-info">
						<i className="foundicon-thumb-down red"> </i>
						{prettyLists.format1(this.getVoters(false), 'username')}
					</span>
					<span className="column small-4 tool-info">
						<i className="foundicon-chat green"> </i>
						{this.getComments()}
					</span>
				</div>
			</div>
		)
	}
});

module.exports = ToolStats;
