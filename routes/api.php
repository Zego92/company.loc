<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::group(['middleware' => ['cors', 'json.response'], 'prefix' => 'admin', 'namespace' => 'Admin'], function () {
    Route::post('/login', 'AuthController@login')->name('login.api');
    Route::post('/logout', 'AuthController@logout')->name('logout.api');
    Route::resource('/dashboard', 'DashboardController');
    Route::resource('/companies', 'CompanyController');
    Route::resource('/employees', 'EmployeeController');
});
