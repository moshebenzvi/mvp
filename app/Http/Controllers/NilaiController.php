<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function index()
    {
        $korektor = auth()->user()->load(['userProfile.kecamatan', 'userProfile.guguses.sekolahs.siswas.nilais.mapel']);
        $mapel = \App\Models\Mapel::where('active', '1')->get();

        return inertia('Nilais/Index', [
            'korektor' => $korektor,
            'mapel' => $mapel,
        ]);
    }

    public function show($id)
    {
        // Fetch a single Nilai record by ID with related Siswa and Mapel
        $nilai = \App\Models\Nilai::with(['siswa', 'mapel'])->findOrFail($id);

        // Return the data as a JSON response
        return response()->json($nilai);
    }
}
