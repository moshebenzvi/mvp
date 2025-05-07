<?php

namespace App\Http\Controllers;

use App\Imports\SekolahImport;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


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

    public function import(Request $request)
    {
        $request->validate([
            'dataSekolah' => 'required|mimes:csv,xls,xlsx'
        ]);
        $file = $request->file('dataSekolah');
        $nama_file = rand(0, 100) . "_Data_Sekolah." . $file->getClientOriginalExtension();
        $file->move('sekolahs', $nama_file);
        Excel::import(new SekolahImport(), public_path('/sekolahs/' . $nama_file));
        // Delete the file after import
        unlink(public_path('/sekolahs/' . $nama_file));
        // Add a flash message
        return redirect()->route('sekolahs.index')->with('success', 'Data Sekolah berhasil diimport');
    }

}
