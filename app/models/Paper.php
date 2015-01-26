<?php

class Paper extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year'];
}
