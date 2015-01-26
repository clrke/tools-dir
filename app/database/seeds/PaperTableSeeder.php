<?php

class PaperTableSeeder extends Seeder {
	public function run()
	{
		Paper::truncate();
		Paper::create([
			'title' => 'Implementation of Subjectivity and Clues Classifications',
			'abstract' => 'Restaurant Reviews are everywhere in Twitter',
			'authors' => 'Parane, et al', 'pageCount' => '50', 'year' => 2015,
			]);
		Paper::create([
			'title' => 'Abstractive Summarizer',
			'abstract' => 'People always say TL;DR',
			'authors' => 'Aranzamendez, et al', 'pageCount' => '500', 'year' => '2015',
			]);
		Paper::create([
			'title' => 'Botanical Naming Chorva',
			'abstract' => 'We need to NER the plants',
			'authors' => 'Bagain, et al', 'pageCount' => '65', 'year' => '2015',
			]);
		Paper::create([
			'title' => 'Pregnancy Test',
			'abstract' => 'You need to know what to do when you\'re pregnant',
			'authors' => 'Aquino, et al', 'pageCount' => '65', 'year' => '2015',
			]);
		Paper::create([
			'title' => 'Sarcasm Detection',
			'abstract' => 'Ang ganda mo!',
			'authors' => 'Delos Reyes, et al', 'pageCount' => '65', 'year' => '2015',
			]);
		Paper::create([
			'title' => 'Faculty Evaluation',
			'abstract' => 'Turo turo din kapag may time.',
			'authors' => 'De Vera, et al', 'pageCount' => '650', 'year' => '2015',
			]);
		Paper::create([
			'title' => 'Employee Evaluation',
			'abstract' => 'Seminar dito seminar doon',
			'authors' => 'Canafranca, et al', 'pageCount' => '66', 'year' => '2015',
			]);
	}
}
