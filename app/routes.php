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
	$papers = Paper::all();
	$years = array_unique(Paper::lists('year'));
	rsort($years);
	$years = json_encode($years);

	return View::make('papers.index', compact('papers', 'years'));
});
