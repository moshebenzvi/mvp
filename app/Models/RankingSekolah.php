<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RankingSekolah extends Model
{
    protected $table = 'ranking_sekolahs';
    public $timestamps = false;
    protected $casts = [
        'avg_nilai' => 'decimal:2',
    ];
    public $incrementing = false;
    protected $primaryKey = 'sekolah_id';
    public function sekolah()
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }
}
