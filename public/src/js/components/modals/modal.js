/** @jsx React.DOM */
var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',
    getInitialState: function () {
        return {};
    },
    propTypes: {
    	title: React.PropTypes.string.isRequired,
    	contents: React.PropTypes.renderable.isRequired
    },
    render: function () {
        return (
			<div id="myModal" className="reveal-modal" data-reveal>
				<h2>{this.props.title}</h2>
				<p>{this.props.contents}</p>
				<a className="close-reveal-modal">&#215;</a>
			</div>
        );
    }
});

module.exports = Modal;
