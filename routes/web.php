<?php

use App\Http\Controllers\UserController;
use App\Models\Gugus;
use App\Models\Kecamatan;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KecamatanController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/coba', function () {
    return \App\Models\User::with('roles', 'userProfile', 'userProfile.guguses', 'userProfile.kecamatan')
        ->get()
        ->map(function ($user) {
            $user->kecamatan = $user->userProfile?->kecamatan->nama;
            $user->gugus = $user->userProfile?->guguses->gugus; 
            $user->role = $user->roles->first()?->name; 
            unset($user->roles); // remove the original roles array
            unset($user->userProfile); // remove the original userProfile object
            return $user;
        });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//todo: create datatable for users