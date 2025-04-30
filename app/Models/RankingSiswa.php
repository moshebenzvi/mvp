<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RankingSiswa extends Model
{
    protected $table = 'ranking_siswas';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = 'siswa_id';
    protected $casts = [
        'PABP' => 'decimal:2',
        'PENDIDIKAN_PANCASILA' => 'decimal:2',
        'IPAS' => 'decimal:2',
        'BAHASA_JAWA' => 'decimal:2',
        'BAHASA_INDONESIA' => 'decimal:2',
        'SENI_BUDAYA' => 'decimal:2',
        'BAHASA_INGGRIS' => 'decimal:2',
        'PJOK' => 'decimal:2',
        'MATEMATIKA' => 'decimal:2',
        'avg_nilai' => 'decimal:2',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    /**
     * Get the school associated with the view.
     */
    public function sekolah()
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }
}
