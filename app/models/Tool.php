<?php

class Tool extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year'];

	public function voters()
	{
		return $this->belongsToMany('User', 'votes')->withPivot('is_positive');
	}
}
