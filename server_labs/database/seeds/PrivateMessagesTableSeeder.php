<?php

use Illuminate\Database\Seeder;

class PrivateMessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

		factory(App\PrivateMessage::class, 5)->create();
		
    }
}
