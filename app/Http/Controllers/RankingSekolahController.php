<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RankingSekolahController extends Controller
{
    private function getRankings()
    {
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
