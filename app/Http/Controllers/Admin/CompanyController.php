<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CompanyStoreRequest;
use App\Http\Requests\Admin\CompanyUpdateRequest;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class CompanyController extends Controller
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
        $companies = Company::where('name', 'LIKE', '%' . $keyWord . '%')
            ->orWhere('email', 'LIKE', '%' . $keyWord . '%')
            ->paginate(10);

        $result['companies'] = $companies->items();
        $result['pagination']['currentPage'] = $companies->currentPage();
        $result['pagination']['total'] = $companies->total();
        $result['pagination']['perPage'] = $companies->perPage();
        $result['pagination']['lastPage'] = $companies->lastPage();

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
    public function store(CompanyStoreRequest $request)
//    public function store(Request $request)
    {
//        return $request->all();
        $result['success'] = false;
        $image = $request->logo;
        $explode_1 = explode(';', $image);
        $explode_2 = explode('/', $explode_1[0]);
        $imageName = Str::random(12) . '.' . $explode_2[1];
        Image::make($image)->resize(100, 100)->save(public_path('/uploads/logo/' . $imageName), 50);
        $company = Company::create([
            'name' => $request->name,
            'email' => $request->email,
            'logo' => $imageName,
            'website' => $request->website,
        ]);
        if ($company){
            $result['success'] = true;
            $result['message'] = 'New company added successfully';
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
        $company = Company::with('employees')->find($id);
        $result['company'] = $company;
        return response()->json($company, 200);
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
    public function update(CompanyUpdateRequest $request, $id)
    {
        $result['success'] = true;
        $company = Company::find($id);
        $image = $request->logo;
        if (isset($image)){
            File::delete(public_path() . '/uploads/logo/' . $company->logo);
            $explode_1 = explode(';', $image);
            $explode_2 = explode('/', $explode_1[0]);
            $imageName = Str::random(12) . '.' . $explode_2[1];
            Image::make($image)->resize(100, 100)->save(public_path('/uploads/logo/' . $imageName), 50);
        }
        $company->update([
            'name' => $request->name,
            'email' => $request->email,
            'logo' => $imageName,
            'website' => $request->website,
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
        $company = Company::find($id);
        $company->delete();
        File::delete(public_path() . '/uploads/logo/' . $company->logo);
        $result['message'] = 'The raw has been delete';
        return response()->json($result, 200);
    }
}
