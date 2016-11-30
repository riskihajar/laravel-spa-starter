<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::truncate();

        \App\User::create([
            'name'     => 'Administrator',
            'email'    => 'admin@laravel-spa.dev',
            'password' => bcrypt('123456')
        ]);
    }
}
