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
					<h1> Registration </h1>
					<hr />
					<h3> Credentials </h3>
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

					<hr />
					<h3> Contact Information </h3>

					<div>
					{{ Form::input('text', 'name', $input? $input->name: null, ['placeholder' => 'First and Last Name']) }}
					@if($errors->first('name'))
						<small class="error">{{$errors->first('name')}}</small>
					@endif
					</div>
					<div>
					{{ Form::input('email', 'email', $input? $input->email: null, ['placeholder' => 'Email Address']) }}
					@if($errors->first('email'))
						<small class="error">{{$errors->first('email')}}</small>
					@endif
					</div>
					<div>
					{{ Form::select('gender',
						[null => 'Select Gender...', '1' => 'Male', '2' => 'Female'],
						$input? $input->gender: null, []) }}
					@if($errors->first('gender'))
						<small class="error">{{$errors->first('gender')}}</small>
					@endif
					</div>

					<hr />
					<h3> Additional Information </h3>

					<div>
					{{ Form::text('occupation', $input? $input->occupation: null, ['placeholder' => 'Occupation']) }}
					@if($errors->first('occupation'))
						<small class="error">{{$errors->first('occupation')}}</small>
					@endif
					</div>
					<div>
					{{ Form::textarea('about', $input? $input->about: null, ['placeholder' => 'Write something about you (e.g. degree, interests)']) }}
					@if($errors->first('about'))
						<small class="error">{{$errors->first('about')}}</small>
					@endif
					</div>
					<button type="submit" class="button">Register</button>
					<a href="/" class="button secondary">Cancel</a>
				</fieldset>
			</form>
		</div>
	</body>
</html>
