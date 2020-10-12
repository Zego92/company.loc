<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Company;
use App\Models\Employee;
use Faker\Generator as Faker;

$factory->define(Employee::class, function (Faker $faker) {
    return [
//        'company_id' => function() {
//            return factory(Company::class)->create()->id;
//        },
        'company_id' => rand(1,100),
        'first_name' => $faker->name,
        'last_name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
    ];
});
