var React = require('react/addons');
var ToolPanel = require('./tool-panel');

var ToolStats = require('./tool-stats');

var ToolsPagination = require('../pagination/pagination');

ToolsList = React.createClass({
	getInitialState: function () {
		var tools = this.props.tools;
		var tool = null;
		var toolId = this.props.toolId;
		var initialAnimation = true;
		var page = 1;

		if(toolId != null) {
			for (var i = 0; i < tools.length; i++) {
				console.log(toolId, tools[i].id);
				if(tools[i].id == toolId) {
					tool = tools[i];
					initialAnimation = false;
					page = Math.ceil((i+1)/this.props.pageLength);
					break;
				}
			}
		}

		return {
			tool: tool,
			tools: tools,
			initialAnimation: initialAnimation,
			page: page,
			pageChange: 0
		};
	},
	propTypes: {
		tools: React.PropTypes.array,
		pageLength: React.PropTypes.number,
		setModalContents: React.PropTypes.func.isRequired
	},
	setCurrentTool: function (tool) {
		if(this.state.tool != tool) {
			$.post('/view/'+tool.id, 'view');
			tool.views++;

			var viewer;
			for (var i = 0; i < tool.viewers.length; i++) {
				if(tool.viewers[i].id == authUser.id) {
					viewer = tool.viewers[i];
					break;
				}
			}

			if(viewer != null) {
				viewer.pivot.count++;
			} else {
				tool.viewers.push({
					id: authUser.id,
					username: authUser.username,
					pivot: {count:1}
				});
			}
		}
		this.setState({tool: tool});
	},
	handlePrev: function () {
		this.setState({page: this.state.page-1, pageChange: -1});
	},
	handleNext: function () {
		this.setState({page: this.state.page+1, pageChange: 1});
	},
	handleSkip: function (page) {
		this.setState({page: page, pageChange: page-this.state.page});
	},
	render: function () {
		var createTr = function (tool) {
			return (
				<ToolPanel
					key={tool.id}
					tool={tool}
					highlight={this.state.tool == tool}
					onClick={this.setCurrentTool.bind(this, tool)}
					pageChange={this.state.pageChange}
					setModalContents={this.props.setModalContents}/>
			);
		}

		var currentTool = this.state.tool?
			(
				<ToolPanel
					tool={this.state.tool}
					key={this.state.tool.id}
					current={true}
					onClick={this.setCurrentTool.bind(this, this.state.tool)}
					setModalContents={this.props.setModalContents}/>
			): null;

		var pageCount = Math.ceil(this.props.tools.length/this.props.pageLength);

		var classNames = React.addons.classSet({
			"column medium-pull-6 medium-6 fixed-container": true,
			"animated fadeInRight": this.state.initialAnimation,
			"animated fadeIn": !this.state.initialAnimation,
		});

		return (
			<div>
				<div className="column medium-6 medium-push-6">
					{currentTool}
				</div>
				<div className={classNames}>
					<div className="panel white">
						<ToolsPagination
							prev={this.handlePrev}
							next={this.handleNext}
							skip={this.handleSkip}
							page={this.state.page}
							pageCount={pageCount}/>
						{this.props.tools.slice(
							this.props.pageLength*(this.state.page-1),
							this.props.pageLength*this.state.page
						).map(createTr, this)}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ToolsList;
