<html ng-app>
	<head>
		<title>Tool - PUP - Natural Language Processing SIG</title>
		<link rel="stylesheet" type="text/css" href="/foundation/css/foundation.min.css">
		<link rel="stylesheet" type="text/css" href="/src/css/main.css">
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="/foundation/js/foundation.min.js"></script>
	</head>
	<body>
		<div class="row">
			<form method="post" enctype="multipart/form-data"
				action="{{$create?'/tools/store':'/tools/'.$tool->id}}" class="margin-fix">
				<fieldset class="column medium-6 small-10 small-centered medium-centered">
					@if($message)
						<div class="panel callout">
							{{$message}}
						</div>
					@endif
					<div>
						{{ Form::text('title',
							$tool? $tool->title : null,
							['placeholder' => 'Title'])
						}}
						@if($errors->first('title'))
							<small class="error">{{$errors->first('title')}}</small>
						@endif
					</div>
					<div>
						{{ Form::textarea('abstract',
							$tool? $tool->abstract : null,
							['placeholder' => 'Abstract'])
						}}
						@if($errors->first('abstract'))
							<small class="error">{{$errors->first('abstract')}}</small>
						@endif
					</div>
					<div>
						{{ Form::text('authors',
							$tool? $tool->authors : null,
							['placeholder' => 'Authors'])
						}}
						@if($errors->first('authors'))
							<small class="error">{{$errors->first('authors')}}</small>
						@endif
					</div>
					<div>
						{{ Form::input('number', 'year',
							$tool? $tool->year : null,
							['placeholder' => 'Year'])
						}}
						@if($errors->first('year'))
							<small class="error">{{$errors->first('year')}}</small>
						@endif
					</div>
					<div>
						{{ Form::file('file', ['placeholder' => 'File'])}}
						@if($errors->first('file'))
							<small class="error">{{$errors->first('file')}}</small>
						@endif
					</div>
					<button type="submit" class="button">
						{{$create?'Create':'Update'}}
					</button>
					<a href="/" class="button secondary">Cancel</a>
				</fieldset>
			</form>
		</div>
	</body>
</html>
