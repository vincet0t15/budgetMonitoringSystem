<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'date_created',
        'serial_no',
        'payee',
        'particulars',
        'fpp',
        'account_code',
        'ammount',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($document) {
            $document->date_created = Carbon::now('singapore')->toDateTimeString();
        });
    }
}
