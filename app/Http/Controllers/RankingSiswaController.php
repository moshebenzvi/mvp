<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RankingSiswaController extends Controller
{
    public function index()
    {
        $rankings = \App\Models\RankingSiswa::with('siswa', 'sekolah', 'sekolah.guguses')
            ->get()
            ->map(function ($ranking) {
                $ranking->siswa_nama = $ranking->siswa->nama;
                $ranking->nisn = $ranking->siswa->nisn;
                $ranking->sekolah_nama = $ranking->sekolah->nama;
                $ranking->npsn = $ranking->sekolah->npsn;
                $ranking->kecamatan = $ranking->sekolah->kecamatan->nama;
                $ranking->gugus = $ranking->sekolah->guguses->gugus;

                unset($ranking->sekolah);
                unset($ranking->siswa);
                return $ranking;
            });

        return inertia('Rankings/Siswa/Index', [
            'rankings' => $rankings,
        ]);
    }

    public function show(Request $request)
    {
        $sekolah_id = $request->input('sekolah_id');
        $mapel_id = $request->input('mapel_id');

        // Validate the input
        if (!$sekolah_id || !$mapel_id) {
            return response()->json(['error' => 'Invalid input'], 400);
        }

        // Fetch the ranking data
        $rankingData = \App\Models\RankingSiswa::where('sekolah_id', $sekolah_id)
            ->where('mapel_id', $mapel_id)
            ->orderBy('AVG_Nilai', 'desc')
            ->get();

        return response()->json($rankingData);
    }
}
