<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function index()
    {
        $korektor = auth()->user()->unsetRelation('roles')->load('userProfile.kecamatan', 'userProfile.guguses');
        return $sekolahs = \App\Models\Sekolah::where('guguses_id', $korektor->userProfile->guguses_id)
            ->toRawSql();
        $mapel = \App\Models\Mapel::active()->get();

        return inertia('Nilais/Index', [
            'korektor' => $korektor,
            'mapels' => $mapel,
            'sekolahs' => $sekolahs,
        ]);
    }

    public function store(Request $request)
    {
        $submissionData = $request->input('submissionData');

        foreach ($submissionData as $data) {
            $validated = \Validator::make($data, [
                'siswa_id' => 'required|exists:siswas,id',
                'mapel_id' => 'required|exists:mapels,id',
                'nilai' => 'required|numeric|min:0|max:100',
            ])->validate();

            \App\Models\Nilai::create($validated);
        }
        return redirect('nilais')->with('success', 'Nilai berhasil ditambahkan.');
        // return redirect()->back()->with('success', 'Nilai berhasil ditambahkan.');
    }
}
