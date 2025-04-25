<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gugus extends Model
{
    /** @use HasFactory<\Database\Factories\GugusFactory> */
    use HasFactory;

    protected $fillable = [
        'gugus',
        'kecamatan_id',
    ];

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    // public function sekolah(): HasMany
    // {
    //     return $this->hasMany(Sekolah::class);
    // }

    public function userProfile(): HasMany
    {
        return $this->hasMany(UserProfile::class);
    }
}
