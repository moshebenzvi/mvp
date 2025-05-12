<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TingkatPenyelesaian extends Model
{
    protected $table = 'tingkat_penyelesaian';
    public $timestamps = false;
    public $incrementing = false;
    protected $casts = [
        'tingkat_penyelesaian' => 'decimal:2',
    ];
}
