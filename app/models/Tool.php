<?php

class Tool extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year'];

	public function upvoters()
	{
		return $this->belongsToMany('User', 'votes')->where('is_positive', true);
	}
	public function downvoters()
	{
		return $this->belongsToMany('User', 'votes')->where('is_positive', false);
	}
}
