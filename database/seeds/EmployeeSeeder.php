<?php

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Employee::class, 10)->create();
//        factory(Company::class, 1)->create()->each(function($company) {
//            $company->employees()->saveMany(factory(Employee::class, 3)->make());
//        });
    }

}
