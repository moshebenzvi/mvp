<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapelController extends Controller
{
    public function index()
    {
        return inertia('Mapels/Index', [
            'mapels' => \App\Models\Mapel::all()
        ]);
    }
}
