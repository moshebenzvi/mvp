<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/coba', function () {
    return \App\Models\RankingSekolah::with('sekolah.gugus.kecamatan')->get()
        ->map(function ($ranking_sekolah) {
            return [
                'sekolah_id' => $ranking_sekolah->sekolah_id,
                'sekolah' => $ranking_sekolah->sekolah->nama,
                'npsn' => $ranking_sekolah->sekolah->npsn,
                'kecamatan' => $ranking_sekolah->sekolah->gugus->kecamatan->nama,
                'gugus' => $ranking_sekolah->sekolah->gugus->gugus,
                'avg_nilai' => $ranking_sekolah->avg_nilai ?? 0,
            ];
        })
        // ->map(function ($ranking_siswa) {
        //     return [
        //         'siswa_id' => $ranking_siswa->siswa_id,
        //         'siswa_nama' => $ranking_siswa->siswa->nama,
        //         'nisn' => $ranking_siswa->siswa->nisn,
        //         'sekolah_nama' => $ranking_siswa->sekolah->nama,
        //         'npsn' => $ranking_siswa->sekolah->npsn,
        //         'kecamatan' => $ranking_siswa->sekolah->gugus->kecamatan->nama,
        //         'avg_nilai' => $ranking_siswa->avg_nilai ?? 0,
        //     ];
        // })
        ;
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('ranking/siswas', [\App\Http\Controllers\RankingSiswaController::class, 'index'])->name('ranking.siswas.index');
    Route::get('ranking/sekolahs', [\App\Http\Controllers\RankingSekolahController::class, 'index'])->name('ranking.sekolahs.index');
    Route::get('ranking/sekolahs/refresh', [\App\Http\Controllers\RankingSekolahController::class, 'refresh'])->name('ranking.sekolahs.refresh');


    Route::middleware(['role:Admin'])->group(function () {
        Route::get('sekolahs', [\App\Http\Controllers\SekolahController::class, 'index'])->name('sekolahs.index');
        Route::post('sekolahs/import', [\App\Http\Controllers\SekolahController::class, 'import'])->name('sekolahs.import');
        Route::get('users', [App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::resource('mapels', App\Http\Controllers\MapelController::class)->only(['index', 'update']);
        Route::get('siswas', [\App\Http\Controllers\SiswaController::class, 'index'])->name('siswas.index');
        Route::post('siswas/import', [\App\Http\Controllers\SiswaController::class, 'import'])->name('siswas.import');

    });

    Route::middleware(['role:Korektor'])->group(function () {
        // Route::get('nilais', [\App\Http\Controllers\NilaiController::class, 'index'])->name('nilais.index');
        Route::resource('nilais', \App\Http\Controllers\NilaiController::class)->only(['index', 'store']);
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
