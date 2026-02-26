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
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function receivedBackDocuments()
    {
        return $this->hasMany(ReceivedBackDocument::class);
    }

    /**
     * Mark document as returned to office
     *
     * @return ReceivedBackDocument
     */
    public function markAsReturned(): ReceivedBackDocument
    {
        return $this->receivedBackDocuments()->create([
            'received_by' => Auth::id(),
            'date_recieved' => now('singapore'),
        ]);
    }

    /**
     * Mark document as not returned (undo last return)
     *
     * @return bool
     */
    public function markAsNotReturned(): bool
    {
        $latestReturn = $this->receivedBackDocuments()
            ->latest('date_recieved')
            ->first();

        if ($latestReturn) {
            return $latestReturn->delete();
        }

        return false;
    }

    /**
     * Check if document has been returned to office
     *
     * @return bool
     */
    public function hasReturned(): bool
    {
        return $this->receivedBackDocuments()
            ->whereNull('deleted_at')
            ->exists();
    }

    /**
     * Get the latest return record
     */
    public function getLatestReturn()
    {
        return $this->receivedBackDocuments()
            ->whereNull('deleted_at')
            ->latest('date_recieved')
            ->first();
    }

    /**
     * Get scope for documents that have been returned
     */
    public function scopeReturned($query)
    {
        return $query->whereHas('receivedBackDocuments', function ($q) {
            $q->whereNull('deleted_at');
        });
    }

    /**
     * Get scope for documents that have not been returned
     */
    public function scopePending($query)
    {
        return $query->whereDoesntHave('receivedBackDocuments', function ($q) {
            $q->whereNull('deleted_at');
        });
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($document) {
            $document->date_created = Carbon::now('singapore')->toDateTimeString();
        });
    }
}
