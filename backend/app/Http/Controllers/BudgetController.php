<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Http\Requests\BudgetRequest;
use Exception;


class BudgetController extends Controller
{
    public function index(){
        $id = '6';
        $budget = Budget::find($id);
        return response()->json([
            'result' => $budget
        ],200);
    }

    public function addIncome(BudgetRequest $request){
       try{
        Budget::create([
            'cash' => $request->cash,
            'digitalMoney' => $request->digitalMoney,
        ]);
        return response()->json([
            'message' => 'Budget successfully created.'
        ],200);

       }catch (Exception $e) {
        return response()->json([
            'message' => 'Something went wrong.',
            'error' => $e->getMessage()
        ],500);
       }
    }

    public function updateIncome(BudgetRequest $request){
        $id = 6;
        try{
         $budget = Budget::find($id);

         if  (!$budget){
            return response()->json([
                'message' => 'Budget not found'
            ],400);
         }

         if ($request->has('cash')){
            $budget->cash = $request->cash;
         }

         if ($request->has('digitalMoney')) {
            $budget->digitalMoney = $request->digitalMoney;
        }

    

        $budget->save();

        return response()->json([
            'message' => 'Budget successfully updated'
        ],200);

 
        }catch (Exception $e) {
         return response()->json([
             'message' => 'Something went wrong.',
             'error' => $e->getMessage()
         ],500);
        }
     }

     public function deleteIncome(BudgetRequest $request){
        $id = 6;
        try{
         $budget = Budget::find($id);

         if  (!$budget){
            return response()->json([
                'message' => 'Budget not found'
            ],400);
         }

         if ($request->has('cash')){
            $budget->cash = 0;
         }

         if ($request->has('digitalMoney')) {
            $budget->digitalMoney = 0;
        }

    

        $budget->save();

        return response()->json([
            'message' => 'Budget successfully updated'
        ],200);

 
        }catch (Exception $e) {
         return response()->json([
             'message' => 'Something went wrong.',
             'error' => $e->getMessage()
         ],500);
        }
     }


}
