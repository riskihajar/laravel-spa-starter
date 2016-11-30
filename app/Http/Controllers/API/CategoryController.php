<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        try{
            $category = Category::paginate(5);
            return response()->json(compact('category'), 200);
        }catch(\Exception $e){
            return response()->json(['messages' => ['Category not exists']], 404);
        }
    }

    public function show($id)
    {
        try{
            $category = Category::find($id);
            return response()->json(compact('category'), 200);
        }catch(\Exception $e){
            return response()->json(['messages' => ['Category not exists']], 404);
        }
    }

    public function store()
    {
        try{
            $category = new Category;
            $category->name = request('name');
            $category->slug = str_slug($category->name);

            $category->save();
            return response()->json(compact('category'), 200);
        }catch(\Exception $e){
            return response()->json(['messages' => ['Can\'t create category' . $e->getMessage() ]], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try{
            $category = Category::find($id);
            $category->name = request('name');
            $category->slug = str_slug($category->name);

            $category->save();
            return response()->json(compact('category'), 200);
        }catch(\Exception $e){
            return response()->json(['messages' => ['Can\'t update category']], 500);
        }
    }

    public function destroy($id)
    {
        try{
            $category = Category::find($id);
            $category->delete();
            return response()->json(compact('category'), 200);
        }catch(\Exception $e){
            return response()->json(['messages' => ['Category not exists']], 404);
        }
    }
}
