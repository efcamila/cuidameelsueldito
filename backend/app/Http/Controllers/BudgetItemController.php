<?php

namespace App\Http\Controllers;

use App\Models\BudgetItem;
use Exception;
use Illuminate\Http\Request;

class BudgetItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try{
            BudgetItem::create([
                'name' => $request->name,
                'estimated' => $request->estimated,
                'current' => $request->current,
                'category_id' => $request->category_id
            ]);
            return response()->json([
                'message' => 'Budget Item successfully created.'
            ],200);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BudgetItem $budgetItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id,Request $request)
    {
        $budgetItem = BudgetItem::find($id);
        if (!$budgetItem){
            return response()->json(['error'=>'No encontrado'],404);
        }

        $budgetItem->name = $request->name;
        $budgetItem->estimated = $request->estimated;
        $budgetItem->current = $request->current;

        $budgetItem->save();

        return response()->json($budgetItem, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BudgetItem $budgetItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, BudgetItem $request)
    {
        $budgetItem = BudgetItem::find($id);
        if (!$budgetItem){
            return response()->json(['error'=>'No encontrado'],404);
        }

        $budgetItem->delete();

        return response()->json(['message' => 'Deleted successfully.'], 200);
    }
}
