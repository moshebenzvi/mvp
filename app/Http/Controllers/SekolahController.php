<?php

namespace App\Http\Controllers;

class SekolahController extends Controller
{
    public function index()
    {
        return inertia('Sekolahs/Index', [
            'sekolahs' => \App\Models\Sekolah::with('guguses', 'kecamatan')->withCount('siswas')
                ->get()
                ->map(function ($sekolah) {
                    $sekolah->gugus = $sekolah->guguses->gugus;
                    $sekolah->nama_kecamatan = $sekolah->kecamatan->nama;
                    unset($sekolah->guguses);
                    unset($sekolah->kecamatan);
                    unset($sekolah->guguses_id);
                    unset($sekolah->kecamatan_id);
                    return $sekolah;
                })
        ]);
    }
}
