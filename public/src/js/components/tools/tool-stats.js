var React = require('react/addons');
var prettyLists = require('pretty-lists/pretty-lists');

ToolStats = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired
	},
	getVoters: function (tool, isPositive) {
		var voters = tool.voters;
		var upvoters = [],
			downvoters = [];

		for (var i = 0; i < voters.length; i++) {
			var voter = voters[i];

			if(voter.pivot.is_positive == '1') {
				upvoters.push(voter);
			} else {
				downvoters.push(voter);
			}
		}

		if(isPositive) {
			voters = upvoters;
		} else {
			voters = downvoters;
		}

		return voters;
	},
	getComments: function (tool) {
		return 0;
	},
	render: function () {
		var tool = this.props.tool;
		return (
			<div className="panel small-padding">
				<div className="row">
					<span className="column small-4 tool-info">
						<i className="foundicon-thumb-up blue"> </i>
						{prettyLists.format1(this.getVoters(tool, true), 'username')}
					</span>
					<span className="column small-4 tool-info">
						<i className="foundicon-thumb-down red"> </i>
						{prettyLists.format1(this.getVoters(tool, false), 'username')}
					</span>
					<span className="column small-4 tool-info">
						<i className="foundicon-chat green"> </i>
						{this.getComments(tool)}
					</span>
				</div>
			</div>
		)
	}
});

module.exports = ToolStats;
