<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Chat::class, function (Faker\Generator $faker) {
    return [
        'sender_id' => rand(1, 4),
        'receiver_id' => rand(1, 4),
        'chat' => $faker->paragraph,
        'read' => rand(0, 1)
    ];
});


$factory->define(App\PrivateMessage::class, function (Faker\Generator $faker) {
    return [
        'sender_id' => rand(1, 4),
        'receiver_id' => rand(1, 4),
        'subject' => $faker->sentence,
        'message' => $faker->paragraph,
        'read' => rand(0, 1)
    ];
});
