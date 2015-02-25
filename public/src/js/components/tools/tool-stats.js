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
		$.post('/vote/'+id+'/'+status);

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
			tool.upvoters.push(authUser);
		} else {
			tool.downvoters.push(authUser);
		}

		this.props.update(tool.id);
	},
	render: function () {
		var id = this.props.tool.id;
		var upvoters = this.getVoters(true);
		var downvoters = this.getVoters(false);

		return (
			<ul className="vcard tool-stats">
				<li>
					<a href="#" onClick={this.vote.bind(this, 1)}>
						<i className="foundicon-thumb-up blue"> </i>
						{
							this.props.current ?
								prettyLists.format1(upvoters, 'username') :
								upvoters.length
						}
					</a>
				</li>
				<li>
					<a href="#" onClick={this.vote.bind(this, 0)}>
						<i className="foundicon-thumb-down red"> </i>
						{
							this.props.current ?
								prettyLists.format1(downvoters, 'username') :
								downvoters.length
						}
					</a>
				</li>
				<li>
					<a href="#">
						<i className="foundicon-chat green"> </i>
						{this.getComments()}
					</a>
				</li>
			</ul>
		)
	}
});

module.exports = ToolStats;
