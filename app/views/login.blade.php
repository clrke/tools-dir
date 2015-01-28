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
		<div class="row">
			<form method="post" action="/login">
				<fieldset class="column medium-6 small-10 small-centered medium-centered">
					@if(Session::get('error'))
						<small class="error">{{Session::get('error')}}</small>
					@endif
					<input type="text" name="username" placeholder="Username">
					<input type="password" name="password" placeholder="Password">
					<button type="submit" class="button">Log In</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>
