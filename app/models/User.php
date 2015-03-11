<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');

	protected $fillable = ['username', 'password', 'email', 'role', 'name', 'accepted'];

	public static $rules = [
		'username' => 'required|unique:users',
		'password' => 'required|confirmed',
		'password_confirmation' => 'required',
		'email' => 'required|email',
		'name' => 'required'
	];

	public function isAdmin()
	{
		return $this->role == 1;
	}
	public function toolsVoted()
	{
		return $this->belongsToMany('Tool', 'votes')
			->withPivot('is_positive')
			->orderBy('votes.updated_at', 'desc');
	}
	public function upvotes()
	{
		return $this->toolsVoted()->where('is_positive', true);
	}
	public function downvotes()
	{
		return $this->toolsVoted()->where('is_positive', false);
	}
	public function toolsViewed()
	{
		return $this->belongsToMany('Tool', 'views')
			->withPivot('count')->orderBy('count', 'desc');
	}
	public function comments()
	{
		return $this->belongsToMany('Tool', 'comments')
			->withPivot('text')->orderBy('comments.id');
	}
	public function toolsCommented()
	{
		return $this->belongsToMany('Tool', 'comments')
			->distinct('pivot_user_id');
	}
}
