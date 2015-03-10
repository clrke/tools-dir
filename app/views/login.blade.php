<html ng-app>
	<head>
		<title>PUP - Natural Language Processing SIG</title>
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
					@if($error)
						<small class="error">{{$error}}</small>
					@endif

					@if($message)
						<div class="panel callout">
							{{$message}}
						</div>
					@endif
					{{ Form::input('text', 'username', $input? $input->username: null, ['placeholder' => 'Username']) }}
					{{ Form::input('password', 'password', null, ['placeholder' => 'Password']) }}
					<button type="submit" class="button">Log In</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>
