<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route;


// Public routes
Route::group(['prefix' => 'v1/auth'], function () {
  Route::post('register', [AuthController::class, 'register']);
  Route::post('login', [AuthController::class, 'login']);
});


// Protected routes
Route::group(['prefix' => 'v1/auth', 'middleware' => ['auth']], function () {
  // Route::get('identify', [AuthController::class, 'identify']);
  Route::post('logout', [AuthController::class, 'logout']);
});
