<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard');
    }

    public function dashboardData()
    {
        $rankings = \App\Models\RankingSekolah::with('sekolah.gugus.kecamatan')->get()
            ->map(function ($dashboard) {
                return [
                    'sekolah_id' => $dashboard->sekolah_id,
                    'jumlah_siswa' => $dashboard->jumlah_siswa,
                    'pabp' => $dashboard->PABP,
                    'pendidikan_pancasila' => $dashboard->PENDIDIKAN_PANCASILA,
                    'ipas' => $dashboard->IPAS,
                    'bahasa_jawa' => $dashboard->BAHASA_JAWA,
                    'bahasa_indonesia' => $dashboard->BAHASA_INDONESIA,
                    'seni_budaya' => $dashboard->SENI_BUDAYA,
                    'bahasa_inggris' => $dashboard->BAHASA_INGGRIS,
                    'pjok' => $dashboard->PJOK,
                    'matematika' => $dashboard->MATEMATIKA,
                    'wajib_nilai' => $dashboard->wajib_nilai,
                    'sudah_nilai' => $dashboard->sudah_nilai,
                    'avg_nilai' => $dashboard->avg_nilai ?? 0,
                    'sekolah' => $dashboard->sekolah->nama,
                    'npsn' => $dashboard->sekolah->npsn,
                    'kecamatan_id' => $dashboard->sekolah->gugus->kecamatan->id,
                    'kecamatan' => $dashboard->sekolah->gugus->kecamatan->nama,
                    'gugus' => $dashboard->sekolah->gugus->gugus,

                ];
            });

        return response()->json($rankings);
    }

    public function penyelesaian()
    {
        $penyelesaian = \App\Models\TingkatPenyelesaian::all();

        return response()->json($penyelesaian);
    }
}
