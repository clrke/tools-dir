<?php

class Tool extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year', 'file'];
	protected $appends = ['views'];

	public static $rules = [
		'title' => 'required',
		'abstract' => 'required',
		'authors' => 'required',
		'year' => 'required|numeric'
	];

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
		return $this->belongsToMany('User', 'votes')
			->withPivot('is_positive')
			->orderBy('votes.updated_at', 'desc');
	}
	public function upvoters()
	{
		return $this->voters()->where('is_positive', true);
	}
	public function downvoters()
	{
		return $this->voters()->where('is_positive', false);
	}
	public function viewers()
	{
		return $this->belongsToMany('User', 'views')
			->withPivot('count')->orderBy('count', 'desc');
	}
	public function downloads()
	{
		return $this->belongsToMany('User', 'downloads')
			->withPivot('created_at')->orderBy('created_at', 'desc');
	}
	public function downloaders()
	{
		return $this->belongsToMany('User', 'downloads')
			->distinct('pivot_user_id');
	}
	public function comments()
	{
		return $this->belongsToMany('User', 'comments')
			->withPivot('text')->orderBy('comments.id');
	}
	public function commenters()
	{
		return $this->belongsToMany('User', 'comments')
			->distinct('pivot_user_id');
	}
}
