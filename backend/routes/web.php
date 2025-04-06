<?php

use App\Http\Controllers\BudgetController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [BudgetController::class, "index"]);
Route::post('/addIncome', [BudgetController::class, 'addIncome']);
