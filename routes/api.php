<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Authentication Routes...
Route::get('/v1/user', 'App\Http\Controllers\Auth\LoginController@getUser')->name('getUser');
Route::post('/v1/user', 'App\Http\Controllers\Auth\LoginController@login')->name('login');
// Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::put('/v1/user', 'App\Http\Controllers\Auth\RegisterController@register')->name('register');

// CRUD routes for Article
Route::resource('/v1/article', ArticleController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy'])
    ->middleware('auth:api');
