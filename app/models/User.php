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

	protected $fillable = ['username', 'password', 'email', 'role', 'name',
		'gender', 'occupation', 'about', 'accepted'];

	public static $rules = [
		'username' => 'required|unique:users',
		'password' => 'required|confirmed',
		'password_confirmation' => 'required',
		'email' => 'required|email',
		'name' => 'required',
		'gender' => 'required',
		'occupation' => 'required',
		'about' => 'required',
	];

	public function getGenderAttribute()
	{
		switch ($this->attributes['gender']) {
			case 1:
				return "Male";
			case 2:
				return "Female";
			default:
				return "Unknown";
		}
	}
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
	public function downloads()
	{
		return $this->belongsToMany('Tool', 'downloads')
			->withPivot('created_at')->orderBy('created_at', 'desc');
	}
	public function toolsDownloaded()
	{
		return $this->belongsToMany('Tool', 'downloads')
			->distinct('pivot_user_id');
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
	public function notifications()
	{
		return $this->hasMany('Notification', 'receiver_id')
			->orderBy('id', 'desc');
	}
	public function notificationFor($user_id, $tool_id)
	{
		$notifications = $this->notifications()
			->whereUnread(true)->get();

		foreach($notifications as $notification) {
			if($notification->user_id == $user_id &&
				$notification->tool_id == $tool_id)
					return $notification;
		}

		return Notification::create([
			'vote_id' => 0,
			'view_id' => 0,
			'download_id' => 0,
			'comment_id' => 0,
			'unread' => true,
			'receiver_id' => $this->id
		]);
	}
}
