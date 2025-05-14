<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/data', [\App\Http\Controllers\DashboardController::class, 'dashboardData'])->name('dashboard.data');
    Route::get('penyelesaian', [\App\Http\Controllers\DashboardController::class, 'penyelesaian'])->name('penyelesaian');

    Route::get('ranking/siswas', [\App\Http\Controllers\RankingSiswaController::class, 'index'])->name('ranking.siswas.index');
    Route::get('ranking/siswas/download', [\App\Http\Controllers\RankingSiswaController::class, 'download'])->name('ranking.siswas.download');
    Route::get('ranking/sekolahs', [\App\Http\Controllers\RankingSekolahController::class, 'index'])->name('ranking.sekolahs.index');
    Route::get('ranking/sekolahs/download', [\App\Http\Controllers\RankingSekolahController::class, 'download'])->name('ranking.sekolahs.download');

    Route::middleware(['role:Admin'])->group(function () {
        Route::get('sekolahs', [\App\Http\Controllers\SekolahController::class, 'index'])->name('sekolahs.index');
        Route::get('users', [App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::resource('mapels', App\Http\Controllers\MapelController::class)->only(['index', 'update']);
        Route::get('siswas', [\App\Http\Controllers\SiswaController::class, 'index'])->name('siswas.index');

        Route::resource('nilais', \App\Http\Controllers\NilaiController::class)->only(['index', 'update', 'destroy']);
        Route::resource('aktifitas', \App\Http\Controllers\AktifitasController::class)->only(['index', 'store']);;
    });

    Route::middleware(['role:Operator Kecamatan'])->group(function () {
        Route::resource('nilais', \App\Http\Controllers\NilaiController::class)->only(['index', 'store']);
        ;
        Route::get('siswas/refresh', [\App\Http\Controllers\SiswaController::class, 'refresh'])->name('siswas.refresh');
    });

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//todo: sekolah: download data sekolah
//todo: siswa: unduh dan upload siswa, edit nilai siswa
//todo: log activity
//todo: notifikasi input nilai sebelum submit
//todo: pemeringkatan: unduh selengkapnya, selector
//todo: evaluasi role
//todo: assets
