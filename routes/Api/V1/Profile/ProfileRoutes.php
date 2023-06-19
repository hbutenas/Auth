<?php

use App\Http\Controllers\Api\V1\Profile\ProfileController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'v1/profile', 'middleware' => ['auth']], function () {
  Route::patch('', [ProfileController::class, 'update']);
});
