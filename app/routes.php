<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	if(Auth::check())
	{
		$tools = Tool::orderBy('created_at')
			->with('upvoters', 'downvoters',
				'comments', 'commenters')->get();

		return View::make('papers.index', compact('tools'));
	}
	else
	{
		$input = Session::get('input');
		$error = Session::get('error');
		return View::make('login', compact('input', 'error'));
	}
});

Route::post('/login', function ()
{
	if(Auth::attempt(Input::all()))
		return Redirect::to('/');
	else
		return Redirect::back()->withInput(Input::all())->withError('Invalid credentials');
});

Route::post('/vote/{id}', function ($id)
{
	$tool = Tool::find($id);
	$user = Auth::user();

	$vote = $tool->voters()->whereUserId($user->id)->first();
	if(isset($vote)) {
		$vote->pivot->update([
			'is_positive' => $vote->pivot->is_positive ? '0': '1',
			'updated_at' => Carbon\Carbon::now()
		]);
	} else {
		$tool->voters()->attach($user, [
			'is_positive' => '1',
			'created_at' => Carbon\Carbon::now(),
			'updated_at' => Carbon\Carbon::now()
		]);
	}

	return $vote->pivot;
});

Route::post('view/{id}', function ($id)
{
	$tool = Tool::find($id);
	$user = Auth::user();

	$view = $tool->viewers()->whereUserId($user->id)->first();
	if(isset($view)) {
		$view->pivot->update([
			'count' => $view->pivot->count+1,
			'updated_at' => Carbon\Carbon::now()
		]);
	} else {
		$tool->viewers()->attach($user, [
			'count' => 1,
			'created_at' => Carbon\Carbon::now(),
			'updated_at' => Carbon\Carbon::now()
		]);
	}

	return $view;
});

Route::post('comment/{id}', function ($id)
{
	$tool = Tool::find($id);
	$user = Auth::user();

	$tool->comments()->attach($user, [
		'text' => Input::get('text'),
		'created_at' => Carbon\Carbon::now(),
		'updated_at' => Carbon\Carbon::now()
	]);

	return $tool->comments;
});

Route::get('/logout', function ()
{
	Auth::logout();
	return Redirect::to('/');
});
