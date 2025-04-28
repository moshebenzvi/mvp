<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kecamatan extends Model
{
    /** @use HasFactory<\Database\Factories\KecamatanFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function userProfile(): HasMany
    {
        return $this->hasMany(UserProfile::class);
    }

    public function guguses(): HasMany
    {
        return $this->hasMany(Gugus::class);
    }

    public function sekolahs(): HasMany
    {
        return $this->hasMany(Sekolah::class);
    }
}
