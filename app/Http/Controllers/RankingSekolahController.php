<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RankingSekolahController extends Controller
{
    private function getRankings()
    {
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
            });
    }
    public function index()
    {
        $rankings = $this->getRankings();
        return inertia('Rankings/Sekolah/Index', [
            'rankings' => $rankings,
        ]);
    }
    public function refresh()
    {
        $rankings = $this->getRankings();
        return response()->json($rankings);
    }
}
