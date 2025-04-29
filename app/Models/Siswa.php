<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    /** @use HasFactory<\Database\Factories\SiswaFactory> */
    use HasFactory;
    protected $fillable = [
        'nama',
        'kelamin',
        'nisn',
        'sekolah_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function sekolah()
    {
        return $this->belongsTo(Sekolah::class);
    }

    public function nilais()
    {
        return $this->hasMany(Nilai::class);
    }

    public function ranking()
    {
        return $this->hasOne(RankingSiswa::class, 'siswa_id');
    }
}
