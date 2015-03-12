var React = require('react/addons');
var moment = require('moment');

var ToolStats = require('./tool-stats');
var ToolComments = require('./tool-comments');

ToolPanel = React.createClass({
	getInitialState: function () {
		return {tool: this.props.tool};
	},
	propTypes: {
		tool: React.PropTypes.object.isRequired,
		setModalContents: React.PropTypes.func.isRequired
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
		var editButton = authUser.role == "1" ? (
			<a
				href={"tools/"+tool.id+"/edit"}>
				[edit]
			</a>
		) : null;

		if(this.props.current) {
			return (
				<div>
					<h3>
						<b className="link-color">
							{tool.title}
						</b>
						<small>
							{editButton}
						</small>
					</h3>
					<h3>
						<small> by {tool.authors}, </small>
						<small> {moment(tool.created_at).fromNow()} </small>
					</h3>
				</div>
			);
		} else {
			return (
				<div>
					<h5>
						<a href="#">
							<b>{tool.title}</b>
						</a>
					</h5>
					<h5>
						<small> by {tool.authors}, </small>
						<small> {moment(tool.created_at).fromNow()} </small>
					</h5>
				</div>
			);
		}
	},
	createParagraph: function (paragraph) {
		return <p> {paragraph} </p>;
	},
	getAbstact: function () {
		var tool = this.props.tool;
		if(this.props.current) {
			return tool.abstract
				.split('\n').map(this.createParagraph, this);
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
	download: function () {
		var tool = this.state.tool;

		tool.downloads.unshift(authUser);

		var downloaderId = tool.downloaders
			.map(function(x) {return x.id; })
			.indexOf(authUser.id);

		if(downloaderId == -1)
			tool.downloaders.unshift(authUser);

		this.props.onClick(tool.id);
	},
	getDownloadButton: function () {
		var tool = this.props.tool;

		if(tool.file.length == 0)
			return (
				<button className="button success disabled">
					Download
				</button>
			);
		else
			return (
				<a href={"/downloads/"+tool.id} onClick={this.download}
					className="button success"> Download </a>
			)
	},
	render: function () {
		var tool = this.props.tool;

		if(this.props.current) {
			var classNames = React.addons.classSet({
				'tool panel white animated slideInLeft': true
			});
			return (
				<div className="fixed-container">
					<div className={classNames}>
						{this.getTitle()}

						{this.getAbstact()}

						{this.getDownloadButton()}

						<ToolStats
							tool={tool}
							current={this.props.current}
							update={this.props.onClick}
							setModalContents={this.props.setModalContents}/>
						<ToolComments tool={tool}
							update={this.props.onClick} />
						<div className="clearfix"> </div>
					</div>
				</div>
			)
		} else {
			var classNames = React.addons.classSet({
				'tool panel small-padding animated': true,
				'clickable': true,
				'fadeIn': this.props.pageChange != 0,
				'callout': this.props.highlight,
				'white':  !this.props.highlight
			});
			return (
				<div className={classNames} key={this.props.tool}
					onClick={
					 	!this.props.highlight?
					 	this.props.onClick: null
					}>
					{this.getTitle()}
					<ToolStats
						tool={tool}
						current={this.props.current}
						update={this.props.onClick}
						setModalContents={this.props.setModalContents}/>
				</div>
			);

		}
	}
});

module.exports = ToolPanel;
