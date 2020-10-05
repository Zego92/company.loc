<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Company;
use Faker\Generator as Faker;

$factory->define(Company::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'email' => $faker->email,
        'logo' => $faker->image(public_path() . '/uploads/logo',100,100, null, false, false, null),
        'website' => $faker->domainName . '.com.ua',
    ];
});
