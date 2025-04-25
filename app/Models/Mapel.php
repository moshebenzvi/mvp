<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mapel extends Model
{
    /** @use HasFactory<\Database\Factories\MapelFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'active',
    ];

    public function userProfile()
    {
        return $this->hasMany(UserProfile::class);
    }
}
