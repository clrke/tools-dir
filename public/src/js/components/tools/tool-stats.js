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
		var upvoters = this.getVoters(true);
		var downvoters = this.getVoters(false);

		return (
			<ul className="vcard tool-stats">
				<li>
					<i className="foundicon-thumb-up blue"> </i>
					{
						this.props.current ?
							prettyLists.format1(upvoters, 'username') :
							upvoters.length
					}
				</li>
				<li>
					<i className="foundicon-thumb-down red"> </i>
					{
						this.props.current ?
							prettyLists.format1(downvoters, 'username') :
							downvoters.length
					}
				</li>
				<li>
					<i className="foundicon-chat green"> </i>
					{this.getComments()}
				</li>
			</ul>
		)
	}
});

module.exports = ToolStats;
