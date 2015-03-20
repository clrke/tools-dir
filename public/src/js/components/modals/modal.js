/** @jsx React.DOM */
var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',
    getInitialState: function () {
        return {};
    },
    propTypes: {
    	title: React.PropTypes.renderable.isRequired,
    	contents: React.PropTypes.renderable.isRequired
    },
    render: function () {
        return (
			<div id="myModal" className="reveal-modal" data-reveal>
				{this.props.title}
				<p>{this.props.contents}</p>
				<a className="close-reveal-modal">&#215;</a>
			</div>
        );
    }
});

module.exports = Modal;
