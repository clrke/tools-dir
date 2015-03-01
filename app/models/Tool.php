<?php

class Tool extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year'];
	protected $appends = ['views'];

	public function getViewsAttribute()
	{
		$views = 0;
		foreach ($this->viewers as $viewer) {
			$views += $viewer->pivot->count;
		}
		return $views;
	}
	public function voters()
	{
		return $this->belongsToMany('User', 'votes');
	}
	public function upvoters()
	{
		return $this->voters()->where('is_positive', true)->orderBy('updated_at');
	}
	public function downvoters()
	{
		return $this->voters()->where('is_positive', false)->orderBy('updated_at');
	}
	public function viewers()
	{
		return $this->belongsToMany('User', 'views')
			->withPivot('count')->orderBy('count', 'desc');
	}
}
