<?php

# Cron job command for Laravel 4.2
# Inspired by Laravel 5's new upcoming scheduler (https://laravel-news.com/2014/11/laravel-5-scheduler)
#
# Author: Soren Schwert (GitHub: sisou)
#
# Requirements:
# =============
# PHP 5.4
# Laravel 4.2 ? (not tested with 4.1 or below)
# A desire to put all application logic into version control
#
# Installation:
# =============
# 1. Put this file into your app/commands/ directory and name it 'CronRunCommand.php'.
# 2. In your artisan.php file (found in app/start/), put this line: 'Artisan::add(new CronRunCommand);'.
# 3. On the server's command line, run 'php artisan cron:run'. If you see a message telling you the
#    execution time, it works!
# 4. On your server, configure a cron job to call 'php-cli artisan cron:run >/dev/null 2>&1' and to
#    run every five minutes (*/5 * * * *)
# 5. Observe your laravel.log file (found in app/storage/logs/) for messages starting with 'Cron'.
#
# Usage:
# ======
# 1. Have a look at the example provided in the fire() function.
# 2. Have a look at the available schedules below (starting at line 132).
# 4. Code your schedule inside the fire() function.
# 3. Done. Now go push your cron logic into version control!

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class MailSendCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'mail:send';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Mails all people with notifications';

	/**
	 * Current timestamp when command is called.
	 *
	 * @var integer
	 */
	protected $timestamp;

	/**
	 * Hold messages that get logged
	 *
	 * @var array
	 */
	protected $messages = array();

	/**
	 * Specify the time of day that daily tasks get run
	 *
	 * @var string [HH:MM]
	 */
	protected $runAt = '03:00';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();

		$this->timestamp = time();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		foreach(User::all() as $user)
		{
			$unreadNotifications = $user->unreadNotifications;
			$unreadNotifsCount = $unreadNotifications->count();
			if($unreadNotifsCount) {

				$subject = "PUP NLP SIG ($unreadNotifsCount)";
				$name = $user->name;
				$content = 'You have '.$unreadNotifsCount.
						' unread notification(s)! Please go to'.
						'the PUP NLP SIG website for more details.';

				Mail::send('mail',
					compact('name', 'content'),
					function($message) use ($user, $subject)
					{
						$message->to($user->email, $user->name)
							->subject($subject);
					}
				);
			}
		}

		$this->finish();
	}

	protected function finish()
	{
		// Write execution time and messages to the log
		$executionTime = round(((microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) * 1000), 3);
		Log::info('Cron: execution time: ' . $executionTime . ' | ' . implode(', ', $this->messages));
	}

	/**
	 * AVAILABLE SCHEDULES
	 */

	protected function everyFiveMinutes(callable $callback)
	{
		if((int) date('i', $this->timestamp) % 5 === 0) call_user_func($callback);
	}

	protected function everyTenMinutes(callable $callback)
	{
		if((int) date('i', $this->timestamp) % 10 === 0) call_user_func($callback);
	}

	protected function everyFifteenMinutes(callable $callback)
	{
		if((int) date('i', $this->timestamp) % 15 === 0) call_user_func($callback);
	}

	protected function everyThirtyMinutes(callable $callback)
	{
		if((int) date('i', $this->timestamp) % 30 === 0) call_user_func($callback);
	}

	/**
	 * Called every full hour
	 */
	protected function hourly(callable $callback)
	{
		if(date('i', $this->timestamp) === '00') call_user_func($callback);
	}

	/**
	 * Called every hour at the minute specified
	 *
	 * @param  integer $minute
	 */
	protected function hourlyAt($minute, callable $callback)
	{
		if((int) date('i', $this->timestamp) === $minute) call_user_func($callback);
	}

	/**
	 * Called every day
	 */
	protected function daily(callable $callback)
	{
		if(date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	/**
	 * Called every day at the 24h-format time specified
	 *
	 * @param  string $time [HH:MM]
	 */
	protected function dailyAt($time, callable $callback)
	{
		if(date('H:i', $this->timestamp) === $time) call_user_func($callback);
	}

	/**
	 * Called every day at 12:00am and 12:00pm
	 */
	protected function twiceDaily(callable $callback)
	{
		if(date('h:i', $this->timestamp) === '12:00') call_user_func($callback);
	}

	/**
	 * Called every weekday
	 */
	protected function weekdays(callable $callback)
	{
		$days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		if(in_array(date('D', $this->timestamp), $days) && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function mondays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Mon' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function tuesdays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Tue' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function wednesdays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Wed' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function thursdays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Thu' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function fridays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Fri' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function saturdays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Sat' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	protected function sundays(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Sun' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	/**
	 * Called once every week (basically the same as using sundays() above...)
	 */
	protected function weekly(callable $callback)
	{
		if(date('D', $this->timestamp) === 'Sun' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	/**
	 * Called once every week at the specified day and time
	 *
	 * @param  string $day  [Three letter format (Mon, Tue, ...)]
	 * @param  string $time [HH:MM]
	 */
	protected function weeklyOn($day, $time, callable $callback)
	{
		if(date('D', $this->timestamp) === $day && date('H:i', $this->timestamp) === $time) call_user_func($callback);
	}

	/**
	 * Called each month on the 1st
	 */
	protected function monthly(callable $callback)
	{
		if(date('d', $this->timestamp) === '01' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

	/**
	 * Called each year on the 1st of January
	 */
	protected function yearly(callable $callback)
	{
		if(date('m', $this->timestamp) === '01' && date('d', $this->timestamp) === '01' && date('H:i', $this->timestamp) === $this->runAt) call_user_func($callback);
	}

}
