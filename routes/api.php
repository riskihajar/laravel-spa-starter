<?php

use Illuminate\Http\Request;

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

Route::group(['middleware' => 'api', 'namespace' => 'API'], function(){
    Route::post('login', 'LoginController@login');

    Route::group(['middleware' => 'jwt.auth'], function(){
        Route::resource('category', 'CategoryController');

        Route::get('profile', function(){
            return auth()->user();
        });
    });
});
