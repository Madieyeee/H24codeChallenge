<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Snippet extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'category', 'code'];

    //
}
