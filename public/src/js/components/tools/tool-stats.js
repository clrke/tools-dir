var React = require('react/addons');
var prettyLists = require('pretty-lists');

ToolStats = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired,
		setModalContents: React.PropTypes.func.isRequired
	},
	getVoters: function (isPositive) {
		var tool = this.props.tool;
		var voters = [];

		if(isPositive) {
			tool.upvoters.forEach(function (voter) {
				if(voter.id != authUser.id) {
					voters.push(voter);
				} else {
					voters.unshift({username:'You'});
				}
			});
			return voters;
		} else {
			tool.downvoters.forEach(function (voter) {
				if(voter.id != authUser.id) {
					voters.push(voter);
				} else {
					voters.unshift('You');
				}
			});
			return voters;
		}
	},
	getComments: function () {
		return 0;
	},
	vote: function () {
		var tool = this.props.tool;
		var id = tool.id;
		$.post('/vote/'+id, 'vote');

		var upvoteId = tool.upvoters.map(function(x) {return x.id; })
			.indexOf(authUser.id);
		var downvoteId = tool.downvoters.map(function(x) {return x.id; })
			.indexOf(authUser.id);

		if(upvoteId != -1) {
			tool.upvoters.splice(upvoteId, 1);
			tool.downvoters.splice(0, 0, authUser);
		} else if(downvoteId != -1) {
			tool.downvoters.splice(downvoteId, 1);
			tool.upvoters.splice(0, 0, authUser);
		} else {
			tool.upvoters.splice(0, 0, authUser);
		}

		this.props.update(tool.id);
	},
	createLi: function (item, i) {
		return <li key={i}> {item} </li>
	},
	modalPresentable: function (items, attr1, attr2) {
		var items2 = prettyLists.getItemsDisplay(items, attr1, attr2);
		return items2.map(this.createLi, this);
	},
	render: function () {
		var id = this.props.tool.id;
		var upvoters = this.getVoters(true);
		var downvoters = this.getVoters(false);
		var viewers = this.state.tool.viewers;
		var views = this.state.tool.views;
		var downloaders = this.state.tool.downloaders;
		var downloads = this.state.tool.downloads;
		var comments = this.state.tool.comments;
		var commenters = this.state.tool.commenters;

		if(this.props.current) {
			return (
				<ul className="panel callout tool-stats">
					<a href="#" onClick={this.vote}>
						<i className="fa fa-thumbs-up blue"> </i>
					</a>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							<h2>Voters</h2>, this.modalPresentable(
								upvoters, 'username'))}>
						{ prettyLists.format1(upvoters, 'username') }
					</a> <br/>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							<h2>Viewers</h2>, this.modalPresentable(
								viewers, 'username', 'pivot.count'))}>
						<i className="fa fa-eye red"> </i>
						{ prettyLists.format2(viewers, 'username', 'pivot.count') }
					</a> <br/>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							<h2>Downloaders</h2>, this.modalPresentable(
								downloads, 'pivot.created_at', 'username'))}>
						<i className="fa fa-download purple"> </i>
						{ prettyLists.format1(downloaders, 'username') }
					</a> <br/>
					<a href="#" data-reveal-id="myModal"
						onClick={this.props.setModalContents.bind(null,
							<h2>Commenters</h2>, this.modalPresentable(
								commenters, 'username'))}>
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
						onClick={this.vote}>
						<i className="fa fa-thumbs-up blue"></i>
						{ upvoters.length }
					</span>
					<span className="small-padding-left">
						<i className="fa fa-eye red"> </i>
						{ views }
					</span>
					<span className="small-padding-left">
						<i className="fa fa-download purple"> </i>
						{ downloads.length }
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
