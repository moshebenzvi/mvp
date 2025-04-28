<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    /** @use HasFactory<\Database\Factories\NilaiFactory> */
    use HasFactory;
    protected $fillable = [
        'siswa_id',
        'mapel_id',
        'nilai',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    
    protected $casts = [
        'nilai' => 'decimal:2',
    ];

    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
