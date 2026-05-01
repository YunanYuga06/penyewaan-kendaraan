<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $role = Auth::user()->role;

        if ($role === 'admin') {
            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->intended('/');
    }
}
