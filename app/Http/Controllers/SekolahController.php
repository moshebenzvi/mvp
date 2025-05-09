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

    public function import(Request $request)
    {
        $request->validate([
            'dataSekolah' => 'required|mimes:csv,xls,xlsx'
        ]);
        $file = $request->file('dataSekolah');
        $nama_file = rand(0, 100) . "_Data_Sekolah." . $file->getClientOriginalExtension();
        $file->move('sekolahs', $nama_file);
        \App\Models\Sekolah::truncate();
        Excel::import(new SekolahImport(), public_path('/sekolahs/' . $nama_file));
        // Delete the file after import
        unlink(public_path('/sekolahs/' . $nama_file));
        // Add a flash message
        return redirect()->route('sekolahs.index')->with('success', 'Data Sekolah berhasil diimport');
    }

}
