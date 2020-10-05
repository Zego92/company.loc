<?php

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Company::class, 5)->create();
//        factory(Company::class, 4)->create()->each(function($c) {
//            $c->employees()->saveMany(factory(Employee::class, 1)
//            );
//        });
    }
}
