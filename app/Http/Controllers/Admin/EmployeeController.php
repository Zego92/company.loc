<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EmployeeStoreRequest;
use App\Http\Requests\Admin\EmployeeUpdateRequest;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyWord = $request->search ?? '';
        $result['success'] = true;
        $employees = Employee::where('first_name', 'LIKE', '%' . $keyWord . '%')
            ->orWhere('last_name', 'LIKE', '%' . $keyWord . '%')
            ->orWhere('phone', 'LIKE', '%' . $keyWord . '%')
            ->paginate(10);

        $result['employees'] = $employees->items();
        $result['pagination']['currentPage'] = $employees->currentPage();
        $result['pagination']['total'] = $employees->total();
        $result['pagination']['perPage'] = $employees->perPage();
        $result['pagination']['lastPage'] = $employees->lastPage();

        return response()->json($result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeStoreRequest $request)
    {
        $result['success'] = false;
        $employee = Employee::create([
            'company_id' => $request->companyId,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);
        if ($employee)
        {
            $result['success'] = true;
            $result['message'] = 'The new employee has been created';
            return response()->json($result, 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result['success'] = true;
        $employee = Employee::with('company')->find($id);
        $result['employee'] = $employee;
        return response()->json($result, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeeUpdateRequest $request, $id)
    {
        $result['success'] = true;
        $employee = Employee::find($id);
        $employee->update([
            'company_id' => $request->companyId,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);
        $result['message'] = 'The raw has been update';
        return response()->json($result, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result['success'] = true;
        $employee = Employee::find($id);
        $employee->delete();
        $result['message'] = 'The raw has been delete';
        return response()->json($result, 200);
    }
}
