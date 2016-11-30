<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth, JWTAuth, JWTException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try{
            if( ! $token = JWTAuth::attempt($credentials)){
                return response()->json(['messages' => ['Invalid Email or Password']], 401);
            }
        }catch(JWTException $e){
            return response()->json(['messages' => ['Can\'t Provide Token']], 500);
        }

        $user = Auth::user();

        return response()->json(compact('token', 'user'));
    }
}
