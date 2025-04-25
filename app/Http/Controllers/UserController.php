<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Users/Index', [
            'users' => \App\Models\User::with('roles', 'userProfile', 'userProfile.guguses', 'userProfile.kecamatan')
                ->get()
                ->map(function ($user) {
                    $user->kecamatan = $user->userProfile?->kecamatan->nama;
                    $user->gugus = $user->userProfile?->guguses->gugus; 
                    $user->role = $user->roles->first()?->name; 
                    unset($user->roles); // remove the original roles array
                    unset($user->userProfile); // remove the original userProfile object
                    return $user;
                })
        ]);
    }
}
