var React = require('react/addons');

module.exports = React.createClass({
	render: function () {
		var createTr = function (tool) {
			return (
				<tr>
					<td> tool.title </td>
					<td> tool.authors </td>
					<td> tool.pageCount </td>
					<td>
						<a href="#" className="button small small-bottom-margin expand">More Information</a> <br/>
					</td>
				</tr>
			)
		}
		return (
			<div className="row">
				<table>
					<thead>
						<tr>
							<th width="450"> Title </th>
							<th width="250"> Authors </th>
							<th width="150"> Page Count </th>
							<th width="250"> Actions </th>
						</tr>
					</thead>
					<tbody ng-repeat="year in years">
						<tr>
							<td colspan="4"> <h3><u>yea </u></h3> </td>
						</tr>
						<tr ng-repeat="paper in papers | filter: {year: year} | filter:search">
							<td> paper.title </td>
							<td> paper.authors </td>
							<td> paper.pageCount </td>
							<td>
								<a href="#" className="button small small-bottom-margin expand">More Information</a> <br/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});
