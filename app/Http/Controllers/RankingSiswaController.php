<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RankingSiswaController extends Controller
{
    public function index()
    {
        $rankings = \App\Models\RankingSiswa::with('siswa', 'sekolah')
            ->orderBy('AVG_Nilai', 'desc')
            ->get();

        return inertia('Rankings/Siswa', [
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
