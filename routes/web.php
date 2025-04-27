<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/coba', function () {
    return \App\Models\Sekolah::with('guguses', 'kecamatan')
    ->get()
    ->map(function ($sekolah) {
        $sekolah->gugus = $sekolah->guguses->gugus;
        $sekolah->nama_kecamatan = $sekolah->kecamatan->nama;
        unset($sekolah->guguses);
        unset($sekolah->kecamatan);
        unset($sekolah->guguses_id);
        unset($sekolah->kecamatan_id);
        return $sekolah;
    });
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
        Route::get('mapels', [App\Http\Controllers\MapelController::class, 'index'])->name('mapels.index');
    });

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//todo: create datatable for users
