var React = require('react/addons');
var prettyLists = require('pretty-lists');

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
	vote: function (status) {
		var tool = this.props.tool;
		var id = tool.id;
		$.post('/vote/'+id+'/'+status, 'vote');

		var upvoteId = tool.upvoters.map(function(x) {return x.id; })
			.indexOf(authUser.id);
		var downvoteId = tool.downvoters.map(function(x) {return x.id; })
			.indexOf(authUser.id);

		if(upvoteId != -1) {
			tool.upvoters.splice(upvoteId, 1);
		} else if(downvoteId != -1) {
			tool.downvoters.splice(downvoteId, 1);
		}

		if(status === 1) {
			tool.upvoters.splice(0, 0, authUser);
		} else {
			tool.downvoters.splice(0, 0, authUser);
		}

		this.props.update(tool.id);
	},
	render: function () {
		var id = this.props.tool.id;
		var upvoters = this.getVoters(true);
		var downvoters = this.getVoters(false);
		var viewers = this.state.tool.viewers;
		var views = this.state.tool.views;
		var comments = this.state.tool.comments;
		var commenters = this.state.tool.commenters;

		if(this.props.current) {
			return (
				<ul className="panel callout tool-stats">
					<a href="#" onClick={this.vote.bind(this, 1)}>
						<i className="fa fa-thumbs-up blue"> </i>
						{ prettyLists.format1(upvoters, 'username') }
					</a> <br/>
					<a href="#">
						<i className="fa fa-eye red"> </i>
						{ prettyLists.format2(viewers, 'username', 'pivot.count') }
					</a> <br/>
					<a href="#">
						<i className="fa fa-comments green"> </i>
						{ prettyLists.format1(commenters, 'username') }
					</a>
				</ul>
			);
		} else {
			return (
				<div className="tool-stats">
					<span
						className="small-padding-left"
						onClick={this.vote.bind(this, 1)}>
						<i className="fa fa-thumbs-up blue"></i>
						{ upvoters.length }
					</span>
					<span className="small-padding-left">
						<i className="fa fa-eye red"> </i>
						{ views }
					</span>
					<span className="small-padding-left">
						<i className="fa fa-download purple"> </i>
						0
					</span>
					<span className="small-padding-left">
						<i className="fa fa-comments green"> </i>
						{ comments.length }
					</span>
				</div>
			);
		}
	}
});

module.exports = ToolStats;
