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
	$papers = json_encode([
		[
			'title' => 'Abstractive Summarizer',
			'authors' => 'Aranzamendez, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Implementation of Subjectivity and Clues Classifications',
			'authors' => 'Parane, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Botanical Garden Chorva',
			'authors' => 'Bagain, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Pregnancy Test',
			'authors' => 'Aquino, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Sarcasm Detection',
			'authors' => 'Delos Reyes, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Faculty Evaluation',
			'authors' => 'De Vera, et al',
			'pageCount' => 15,
			'year' => 2015
		],
		[
			'title' => 'Employee Evaluation',
			'authors' => 'Canafranca, et al',
			'pageCount' => 15,
			'year' => 2015
		]
	]);
	$years = json_encode([2015]);

	return View::make('papers.index', compact('papers', 'years'));
});
