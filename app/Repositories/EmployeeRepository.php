<?php


namespace App\Repositories;


use App\Models\Company;
use App\Models\Employee;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;

class EmployeeRepository implements EmployeeRepositoryInterface
{
    public function all()
    {
        return Employee::with('company')->get();
    }
    public function getById(Employee $employee)
    {
        return Company::with('company')->where('company_id', $employee->company_id)->get();
    }
}
