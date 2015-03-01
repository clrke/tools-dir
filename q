[1mdiff --git a/public/src/css/main.css b/public/src/css/main.css[m
[1mindex ea37da6..326ade1 100644[m
[1m--- a/public/src/css/main.css[m
[1m+++ b/public/src/css/main.css[m
[36m@@ -38,6 +38,10 @@[m
 	background-color: white;[m
 }[m
 [m
[32m+[m[32m.tool.panel {[m
[32m+[m	[32mmargin: 0px;[m
[32m+[m[32m}[m
[32m+[m
 .fixed-container {[m
 	height: 100%;[m
 	overflow-x: hidden;[m
[1mdiff --git a/public/src/js/components/tools/tool-panel.js b/public/src/js/components/tools/tool-panel.js[m
[1mindex a94bee7..79fdcbc 100644[m
[1m--- a/public/src/js/components/tools/tool-panel.js[m
[1m+++ b/public/src/js/components/tools/tool-panel.js[m
[36m@@ -2,6 +2,7 @@[m [mvar React = require('react/addons');[m
 var moment = require('moment');[m
 [m
 var ToolStats = require('./tool-stats');[m
[32m+[m[32mvar ToolComments = require('./tool-comments');[m
 [m
 ToolPanel = React.createClass({[m
 	getInitialState: function () {[m
[36m@@ -87,7 +88,7 @@[m [mToolPanel = React.createClass({[m
 [m
 		if(this.props.current) {[m
 			return ([m
[31m-				<div className="panel white animated slideInLeft">[m
[32m+[m				[32m<div className="tool panel white animated slideInLeft">[m
 					{this.getTitle()}[m
 [m
 					{this.getAbstact()}[m
[36m@@ -102,7 +103,7 @@[m [mToolPanel = React.createClass({[m
 			)[m
 		} else {[m
 			var classNames = React.addons.classSet({[m
[31m-				'panel small-padding animated': true,[m
[32m+[m				[32m'tool panel small-padding animated': true,[m
 				'fadeIn': this.props.pageChange != 0,[m
 				'callout': this.props.highlight,[m
 				'white':  !this.props.highlight[m
[1mdiff --git a/public/src/js/main.js b/public/src/js/main.js[m
[1mindex 545ee6c..eb34a54 100644[m
[1m--- a/public/src/js/main.js[m
[1m+++ b/public/src/js/main.js[m
[36m@@ -23561,11 +23561,27 @@[m [mReact.render([m
 [m
 $(document).foundation();[m
 [m
[31m-},{"./tools/tools-list":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tools-list.js","./topbars/topbar":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/topbars/topbar.js","react":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/react/react.js"}],"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-panel.js":[function(require,module,exports){[m
[32m+[m[32m},{"./tools/tools-list":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tools-list.js","./topbars/topbar":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/topbars/topbar.js","react":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/react/react.js"}],"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-comments.js":[function(require,module,exports){[m
[32m+[m[32mvar React = require('react/addons');[m
[32m+[m
[32m+[m[32mToolStats = React.createClass({displayName: "ToolStats",[m
[32m+[m	[32mrender: function () {[m
[32m+[m		[32mreturn ([m
[32m+[m			[32mReact.createElement("div", {className: "panel white radius"},[m[41m [m
[32m+[m				[32m"XD"[m
[32m+[m			[32m)[m
[32m+[m		[32m)[m
[32m+[m	[32m}[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mmodule.exports = ToolStats;[m
[32m+[m
[32m+[m[32m},{"react/addons":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/react/addons.js"}],"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-panel.js":[function(require,module,exports){[m
 var React = require('react/addons');[m
 var moment = require('moment');[m
 [m
 var ToolStats = require('./tool-stats');[m
[32m+[m[32mvar ToolComments = require('./tool-comments');[m
 [m
 ToolPanel = React.createClass({displayName: "ToolPanel",[m
 	getInitialState: function () {[m
[36m@@ -23651,7 +23667,7 @@[m [mToolPanel = React.createClass({displayName: "ToolPanel",[m
 [m
 		if(this.props.current) {[m
 			return ([m
[31m-				React.createElement("div", {className: "panel white animated slideInLeft"}, [m
[32m+[m				[32mReact.createElement("div", {className: "tool panel white animated slideInLeft"},[m[41m [m
 					this.getTitle(), [m
 [m
 					this.getAbstact(), [m
[36m@@ -23666,7 +23682,7 @@[m [mToolPanel = React.createClass({displayName: "ToolPanel",[m
 			)[m
 		} else {[m
 			var classNames = React.addons.classSet({[m
[31m-				'panel small-padding animated': true,[m
[32m+[m				[32m'tool panel small-padding animated': true,[m
 				'fadeIn': this.props.pageChange != 0,[m
 				'callout': this.props.highlight,[m
 				'white':  !this.props.highlight[m
[36m@@ -23687,7 +23703,7 @@[m [mToolPanel = React.createClass({displayName: "ToolPanel",[m
 [m
 module.exports = ToolPanel;[m
 [m
[31m-},{"./tool-stats":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-stats.js","moment":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/moment/moment.js","react/addons":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/react/addons.js"}],"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-stats.js":[function(require,module,exports){[m
[32m+[m[32m},{"./tool-comments":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-comments.js","./tool-stats":"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-stats.js","moment":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/moment/moment.js","react/addons":"/home/arkeidolon/Documents/laravel/tools-dir/node_modules/react/addons.js"}],"/home/arkeidolon/Documents/laravel/tools-dir/public/src/js/components/tools/tool-stats.js":[function(require,module,exports){[m
 var React = require('react/addons');[m
 var prettyLists = require('pretty-lists');[m
 [m
