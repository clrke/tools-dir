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
	getTitle: function () {
		var tool = this.props.tool;
		if(this.props.current) {
			return (
				<h3>
					<b className="link-color"> {tool.title} </b>
					<small> by {tool.authors}, </small>
					<small> {moment(tool.created_at).fromNow()} </small>
				</h3>
			);
		} else {
			return (
				<h5>
					<a href="#" onClick={this.props.onClick}>
						<b>{tool.title}</b>
					</a>
					<small> by {tool.authors},</small>
					<small> {moment(tool.created_at).fromNow()} </small>
				</h5>
			);
		}
	},
	getAbstact: function () {
		var tool = this.props.tool;
		if(this.props.current) {
			return tool.abstract;
		} else {
			return this.shorten(tool.abstract);
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

		if(this.props.current) {
			return (
				<div className="panel white">
					{this.getTitle()}

					{this.getAbstact()}

					<ToolStats
						tool={tool}
						current={this.props.current}
						update={this.props.onClick} />

					<div className="clearfix"> </div>
				</div>
			)
		} else {
			return (
				<div className="panel white small-padding">
					{this.getTitle()}
					<ToolStats
						tool={tool}
						current={this.props.current}
						update={this.props.onClick} />
				</div>
			);

		}
	}
});

module.exports = ToolPanel;
