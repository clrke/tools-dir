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
		$tools = Tool::orderBy('created_at')->with('upvoters', 'downvoters')->get();

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

Route::post('/vote/{id}/{status}', function ($id, $status)
{
	$tool = Tool::find($id);
	$user = Auth::user();

	if($tool->voters->contains($user->id)) {
		$tool->voters()->updateExistingPivot($user->id, [
			'is_positive' => $status == '1']);
	} else {
		$tool->voters()->attach($user, [
			'is_positive' => $status == '1']);
	}

	return Redirect::back();
});

Route::get('/logout', function ()
{
	Auth::logout();
	return Redirect::to('/');
});
