<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\BudgetItemController;
use App\Models\BudgetItem;
use App\Models\Item;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('getBudget', [BudgetController::class, 'index']);
Route::post('addIncome', [BudgetController::class, 'addIncome']);
Route::put('updateIncome', [BudgetController::class, 'updateIncome']);
Route::put('deleteIncome', [BudgetController::class, 'deleteIncome']);

Route::get('budgetsItems/{id}',function($id){
    $items = BudgetItem::where('category_id', $id)->get();
    if ($items->isEmpty()) {
        return response()->json(['message' => 'No items found for this id'], 404);
    }

    return response()->json($items, 200);

});
Route::post('insertBudgetItem', [BudgetItemController::class, 'create']);
Route::put('updateBudgetItem/{id}', [BudgetItemController::class, 'edit']);
Route::delete('deleteBudgetItem/{id}', [BudgetItemController::class, 'destroy']);

