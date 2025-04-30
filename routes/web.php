<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/coba', function () {
    return \App\Models\RankingSekolah::with('sekolah', 'sekolah.kecamatan', 'sekolah.guguses')
    ->get()
    ->map(function ($ranking) {
        $ranking->sekolah_nama = $ranking->sekolah->nama;
        $ranking->npsn = $ranking->sekolah->npsn;
        $ranking->kecamatan_id = $ranking->sekolah->kecamatan_id;
        $ranking->kecamatan_nama = $ranking->sekolah->kecamatan->nama;
        $ranking->gugus = $ranking->sekolah->guguses->gugus;
        unset($ranking->sekolah);
        return $ranking;
    });
    // ->map(function ($ranking) {
    //     $ranking->siswa_nama = $ranking->siswa->nama;
    //     $ranking->nisn = $ranking->siswa->nisn;
    //     $ranking->sekolah_nama = $ranking->sekolah->nama;
    //     $ranking->npsn = $ranking->sekolah->npsn;
    //     $ranking->kecamatan = $ranking->sekolah->kecamatan->nama;
    //     $ranking->gugus = $ranking->sekolah->guguses->gugus;
    //     unset($ranking->sekolah);
    //     unset($ranking->siswa);
    //     return $ranking;
    // });
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

    Route::get('ranking/siswas', [\App\Http\Controllers\RankingSiswaController::class, 'index'])->name('ranking.siswas.index');
    Route::get('ranking/sekolahs', [\App\Http\Controllers\RankingSekolahController::class, 'index'])->name('ranking.sekolahs.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//todo: create datatable for users
