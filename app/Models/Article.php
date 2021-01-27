<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';
    public $timestamps = true;

    protected $fillable = [
        'id',
        'title',
        'description',
        'content',
        'public',
        'user_id'
    ];

    protected $with = ['user'];

    /**
     * Get the author
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
