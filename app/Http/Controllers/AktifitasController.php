<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AktifitasController extends Controller
{
    public function index()
    {
        return inertia('Aktifitas/Index', [
            'aktifitas' => \App\Models\Aktifitas::with('user')->orderByDesc('created_at')->get()
                ->map(function ($aktifitas) {
                    return [
                        'id' => $aktifitas->id,
                        'name' => $aktifitas->user->name,
                        'username' => $aktifitas->user->username,
                        'aktifitas' => $aktifitas->aktifitas,
                        'created_at' => $aktifitas->created_at,
                    ];
                }),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'aktifitas' => ['required'],
        ]);

        return \App\Models\Aktifitas::create($data);
    }

    public function show(\App\Models\Aktifitas $aktifitas)
    {
        return $aktifitas;
    }

    public function update(Request $request, \App\Models\Aktifitas $aktifitas)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'aktifitas' => ['required'],
        ]);

        $aktifitas->update($data);

        return $aktifitas;
    }

    public function destroy(\App\Models\Aktifitas $aktifitas)
    {
        $aktifitas->delete();

        return response()->json();
    }
}
