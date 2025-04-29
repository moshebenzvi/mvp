<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/coba', function () {
    return \App\Models\Sekolah::with('rankingSiswa')
    // ->orderBy('AVG_Nilai', 'desc')
    ->get();
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::middleware(['role:Admin'])->group(function () {
        Route::get('sekolahs', [\App\Http\Controllers\SekolahController::class, 'index'])->name('sekolahs.index');
        Route::get('users', [App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::resource('mapels', App\Http\Controllers\MapelController::class)->only(['index', 'update']);
        Route::get('siswas', [\App\Http\Controllers\SiswaController::class, 'index'])->name('siswas.index');
    });

    Route::middleware(['role:Korektor'])->group(function () {
        // Route::get('nilais', [\App\Http\Controllers\NilaiController::class, 'index'])->name('nilais.index');
        Route::resource('nilais', \App\Http\Controllers\NilaiController::class)->only(['index', 'store']);
        Route::get('siswas/refresh', [\App\Http\Controllers\SiswaController::class, 'refresh'])->name('siswas.refresh');
    });

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//todo: create datatable for users
