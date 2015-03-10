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
			<form method="post" action="/register" class="margin-fix">
				<fieldset class="column medium-6 small-10 small-centered medium-centered">
					<div>
						{{ Form::input('text', 'username', $input? $input->username: null, ['placeholder' => 'Username']) }}
						@if($errors->first('username'))
							<small class="error">{{$errors->first('username')}}</small>
						@endif
					</div>
					<div>
						{{ Form::input('password', 'password', null, ['placeholder' => 'Password']) }}
						@if($errors->first('password'))
							<small class="error">{{$errors->first('password')}}</small>
						@endif
					</div>
					<div>
					{{ Form::input('password', 'password_confirmation', null, ['placeholder' => 'Confirm Password']) }}
					@if($errors->first('password_confirmation'))
						<small class="error">{{$errors->first('password_confirmation')}}</small>
					@endif
					</div>
					<div>
					{{ Form::input('email', 'email', $input? $input->email: null, ['placeholder' => 'Email Address']) }}
					@if($errors->first('email'))
						<small class="error">{{$errors->first('email')}}</small>
					@endif
					</div>
					<div>
					{{ Form::input('text', 'name', $input? $input->name: null, ['placeholder' => 'First and Last Name']) }}
					@if($errors->first('name'))
						<small class="error">{{$errors->first('name')}}</small>
					@endif
					</div>
					<button type="submit" class="button">Register</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>
