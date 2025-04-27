<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sekolah extends Model
{
    /** @use HasFactory<\Database\Factories\SekolahFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'npsn',
        'guguses_id',
        'kecamatan_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function guguses()
    {
        return $this->belongsTo(Gugus::class);
    }
    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class);
    }
}
