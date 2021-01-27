<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Login method
     */
    public function login(Request $request) {
        if (\Auth::attempt([
            'name' => $request->input('username'),
            'password' => $request->input('password'),
        ], true)) {
            return response()->json(['token' => \Auth::user()->api_token, 'user' => \Auth::user()]);
        } else {
            return response(null, 401);
        }
    }

    public function getUser(Request $request) {
        if ($user = User::where([
            'api_token' => $request->input('token')
        ])->first()) {
            return response()->json($user);
        } else {
            return response(null, 401);
        }
    }
}
