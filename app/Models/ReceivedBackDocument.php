<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceivedBackDocument extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'document_id',
        'received_by',
        'date_recieved',
    ];

    protected $casts = [
        'date_recieved' => 'datetime',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function receivedBy()
    {
        return $this->belongsTo(User::class, 'received_by');
    }
}
