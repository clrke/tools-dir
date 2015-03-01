var React = require('react/addons');

ToolStats = React.createClass({
	propTypes: {
		tool: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
	    return {
	        comments: this.props.tool.comments
	    };
	},
	handleSubmit: function (event) {
		event.preventDefault();
		var text = this.refs.comment.getDOMNode().value;
		this.state.comments.push({
			username: authUser.username,
			pivot: {text: text}
		});
		$.post('/comment/'+this.props.tool.id, {text: text});
		this.setState({comments: this.state.comments});
		this.refs.comment.getDOMNode().value='';
	},
	commentPanels: function () {
		return this.state.comments.map(function (comment) {
			return (
				<div className="tool panel white ">
					<b> {comment.username}: </b>
					{comment.pivot.text}
				</div>
			);
		}, this);
	},
	render: function () {
		return (
			<div className="panel white radius">
				{this.commentPanels()}
				<form onSubmit={this.handleSubmit}>
					<input type="text" ref="comment"
						className="write comment"
						placeholder="Write a comment..."/>
				</form>
			</div>
		)
	}
});

module.exports = ToolStats;
