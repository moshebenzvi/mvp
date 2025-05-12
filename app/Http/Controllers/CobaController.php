<?php

namespace App\Http\Controllers;

    use App\Models\Coba;
    use Illuminate\Http\Request;
    
    class CobaController extends Controller {
        public function index()
        {
        return Coba::all();
        }
        
        public function store(Request $request)
        {
        $data = $request->validate([
        'nama' => ['required'],
        ]);
        
        return Coba::create($data);
        }
        
        public function show(Coba $coba)
        {
        return $coba;
        }
        
        public function update(Request $request, Coba $coba)
        {
        $data = $request->validate([
        'nama' => ['required'],
        ]);
        
        $coba->update($data);
        
        return $coba;
        }
        
        public function destroy(Coba $coba)
        {
        $coba->delete();
        
        return response()->json();
        }
    }
