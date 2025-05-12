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
                    'pabp' => $dashboard->pabp,
                    'pendidikan_pancasila' => $dashboard->pendidikan_pancasila,
                    'ipas' => $dashboard->ipas,
                    'bahasa_jawa' => $dashboard->bahasa_jawa,
                    'bahasa_indonesia' => $dashboard->bahasa_indonesia,
                    'seni_budaya' => $dashboard->seni_budaya,
                    'bahasa_inggris' => $dashboard->bahasa_inggris,
                    'pjok' => $dashboard->pjok,
                    'matematika' => $dashboard->matematika,
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
