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

    public function gugus()
    {
        return $this->belongsTo(Gugus::class, 'gugus_id', 'id')->withDefault();
    }
    public function siswas()
    {
        return $this->hasMany(Siswa::class);
    }

    public function ranking()
    {
        return $this->hasOne(RankingSekolah::class, 'sekolah_id');
    }
    public function rankingSiswa()
    {
        return $this->hasMany(RankingSiswa::class, 'sekolah_id');
    }
}
