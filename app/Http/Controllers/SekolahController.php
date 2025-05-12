<?php

namespace App\Http\Controllers;

use App\Imports\SekolahImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class SekolahController extends Controller
{
    public function index()
    {
        return inertia('Sekolahs/Index', [
            'sekolahs' => \App\Models\Sekolah::with('gugus.kecamatan')->withCount('siswas')->get()
                ->map(function ($sekolah) {
                    return [
                        'id' => $sekolah->id,
                        'nama' => $sekolah->nama,
                        'npsn' => $sekolah->npsn,
                        'siswas_count' => $sekolah->siswas_count,
                        'kecamatan' => $sekolah->gugus->kecamatan->nama,
                        'gugus' => $sekolah->gugus->gugus,
                    ];
                })
        ]);
    }

}
