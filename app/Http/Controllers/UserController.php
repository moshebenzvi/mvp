<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Users/Index', [
            'users' => \App\Models\User::with('roles', 'gugus.kecamatan')->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'username' => $user->username,
                        'role' => $user->roles->pluck('name')->first(),
                        'kecamatan' => $user->gugus->kecamatan->nama,
                        'gugus' => $user->gugus->gugus,
                    ];
                })
        ]);
    }
}
