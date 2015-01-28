<!DOCTYPE>
<html ng-app>
	<head>
		<title>Thesis Papers</title>
		<link rel="stylesheet" type="text/css" href="foundation/css/foundation.min.css">
		<link rel="stylesheet" type="text/css" href="src/css/main.css">
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="foundation/js/foundation.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
	</head>
	<body>
		<div class="fixed">
			<nav class="top-bar" data-topbar role="navigation">
				<ul class="title-area">
					<li class="name">
						<h1><a href="#">Thesis Papers Directory</a></h1>
					</li>
				     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
				    <li class="toggle-topbar menu-icon"><a href="#"><span>MENU</span></a></li>
				</ul>
				<section class="top-bar-section">
					<ul class="right">
						<li class="has-dropdown">
							<a href="#">Clarke Benedict Plumo</a>
							<ul class="dropdown">
								<li><a href="#">Submit Paper</a></li>
								<li><a href="#">Log Out</a></li>
							</ul>
						</li>
					</ul>

					<!-- Left Nav Section -->
					<ul class="left">
						<li><input type="text" placeholder="Search query" ng-model="search"></li>
					</ul>
				</section>
			</nav>
		</div>
		<div class="row">
			<table ng-init='papers = {{ $papers }}; years = {{ $years }}'>
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
						<td colspan="4"> <h3><u> @{{year}} </u></h3> </td>
					</tr>
					<tr ng-repeat="paper in papers | filter: {year: year} | filter:search">
						<td> @{{ paper.title }} </td>
						<td> @{{ paper.authors }} </td>
						<td> @{{ paper.pageCount }} </td>
						<td>
							<a href="#" class="button small small-bottom-margin expand">More Information</a> <br/>
							<a href="#" class="button small small-bottom-margin info expand">Download PDF</a> <br/>
							<a href="#" class="button small small-bottom-margin success expand">Edit Content</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</body>
</html>
