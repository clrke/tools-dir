var React = require('react/addons');
var moment = require('moment');

var ToolStats = require('./tool-stats');

ToolPanel = React.createClass({
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

		return voters.length;
	},
	getComments: function (tool) {
		return 0;
	},
	render: function () {
		var tool = this.props.tool;
		return (
			<div className="panel white">
				<h3>
					<a href="#" onClick={this.props.onClick}>
						<b>{tool.title}</b>
					</a>
					<small> by {tool.authors} </small>
				</h3>
				<div className="panel white tool-info">
					<ToolStats tool={tool}/>
					{this.shorten(tool.abstract)}
					<small> {moment(tool.created_at).fromNow()} </small>
					 <div className="clearfix"> </div>
				</div>
			</div>
		)
	}
});

module.exports = ToolPanel;
