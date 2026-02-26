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
        'remarks',
        'is_returned',
        'returned_at',
        'return_notes',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Mark document as returned to office
     *
     * @param string|null $notes Optional notes about the return
     * @return bool
     */
    public function markAsReturned(?string $notes = null): bool
    {
        $this->is_returned = true;
        $this->returned_at = Carbon::now('singapore')->toDateTimeString();
        $this->return_notes = $notes;
        return $this->save();
    }

    /**
     * Mark document as not returned
     *
     * @return bool
     */
    public function markAsNotReturned(): bool
    {
        $this->is_returned = false;
        $this->returned_at = null;
        $this->return_notes = null;
        return $this->save();
    }

    /**
     * Check if document has been returned to office
     *
     * @return bool
     */
    public function hasReturned(): bool
    {
        return $this->is_returned === true || $this->is_returned === 1;
    }

    /**
     * Get scope for documents that have been returned
     */
    public function scopeReturned($query)
    {
        return $query->where('is_returned', true);
    }

    /**
     * Get scope for documents that have not been returned
     */
    public function scopePending($query)
    {
        return $query->where('is_returned', false);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($document) {
            $document->date_created = Carbon::now('singapore')->toDateTimeString();
        });
    }
}
