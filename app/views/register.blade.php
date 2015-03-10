<html ng-app>
	<head>
		<title>Register - PUP - Natural Language Processing SIG</title>
		<link rel="stylesheet" type="text/css" href="foundation/css/foundation.min.css">
		<link rel="stylesheet" type="text/css" href="src/css/main.css">
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="foundation/js/foundation.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
	</head>
	<body>
		<div class="row">
			<form method="post" action="/register">
				<fieldset class="column medium-6 small-10 small-centered medium-centered">
					@if(isset($error))
						<small class="error">{{$error}}</small>
					@endif
					{{ Form::input('text', 'username', $input? $input->username: null, ['placeholder' => 'Username']) }}
					{{ Form::input('password', 'password', null, ['placeholder' => 'Password']) }}
					{{ Form::input('password', 'cpassword', null, ['placeholder' => 'Confirm Password']) }}
					{{ Form::input('email', 'email', $input? $input->email: null, ['placeholder' => 'Email Address']) }}
					{{ Form::input('text', 'name', $input? $input->name: null, ['placeholder' => 'First and Last Name']) }}
					<button type="submit" class="button">Log In</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>
