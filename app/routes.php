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
		$papers = Paper::all();
		$years = array_unique(Paper::lists('year'));
		rsort($years);
		$years = json_encode($years);

		return View::make('papers.index', compact('papers', 'years'));
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

Route::get('/logout', function ()
{
	Auth::logout();
	return Redirect::to('/');
});
