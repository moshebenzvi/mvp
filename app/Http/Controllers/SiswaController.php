<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        return inertia('Siswas/Index', [
            'siswas' => \App\Models\Siswa::with('sekolah')
                ->get()
                ->map(function ($siswa) {
                    $siswa->nama_sekolah = $siswa->sekolah->nama;
                    $siswa->npsn_sekolah = $siswa->sekolah->npsn;
                    $siswa->nama_kecamatan = $siswa->sekolah->kecamatan->nama;
                    unset($siswa->sekolah);
                    unset($siswa->sekolah_id);
                    unset($siswa->kecamatan);
                    unset($siswa->kecamatan_id);
                    return $siswa;
                })
        ]);
    }
}
