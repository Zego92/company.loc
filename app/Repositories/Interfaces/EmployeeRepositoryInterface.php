<?php


namespace App\Repositories\Interfaces;

use App\Models\Employee;

interface EmployeeRepositoryInterface
{
    public function all();

    public function getById(Employee $employee);
}
