<?php

class UserTableSeeder extends Seeder {
	public function run()
	{
		User::truncate();
		User::create([
			'username' => 'admin',
			'password' => Hash::make('admin'),
			'email' => 'admin@thesisdir.com',
			'role' => 1,
			'name' => 'Administrator',
			'accepted' => 1
		]);
	}
}
