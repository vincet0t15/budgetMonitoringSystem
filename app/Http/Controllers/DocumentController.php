<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'payee' => 'required|string|max:255',
            'particulars' => 'nullable|string|max:255',
            'fpp' => 'nullable|string|max:255',
            'account_code' => 'nullable|string|max:255',
            'ammount' => 'required|numeric',
            'project_id' => 'required|exists:projects,id',
            'remarks' => 'nullable|string|max:1000',
        ]);

        Document::create($request->all());

        return redirect()->back()->with('success', 'Document created successfully.');
    }

    /**
     * Update a document
     */
    public function update(Request $request, Document $document)
    {
        $request->validate([
            'payee' => 'required|string|max:255 ',
            'particulars' => 'nullable|string|max:255',
            'fpp' => 'nullable|string|max:255',
            'account_code' => 'nullable|string|max:255',
            'ammount' => 'required|numeric',
            'remarks' => 'nullable|string|max:1000',
        ]);

        $document->update($request->all());

        return redirect()->back()->with('success', 'Document updated successfully.');
    }

    /**
     * Mark a document as returned to office
     */
    public function markAsReturned(Request $request, Document $document)
    {
        $request->validate([
            'return_notes' => 'nullable|string|max:1000',
        ]);

        $document->markAsReturned($request->input('return_notes'));

        return redirect()->back()->with('success', 'Document marked as returned to office.');
    }

    /**
     * Mark a document as not returned (pending)
     */
    public function markAsPending(Request $request, Document $document)
    {
        $document->markAsNotReturned();

        return redirect()->back()->with('success', 'Document marked as pending return.');
    }

    /**
     * Get all pending documents (not yet returned)
     */
    public function pendingDocuments($projectId = null)
    {
        $query = Document::pending();

        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        $pendingDocuments = $query->latest('date_created')->paginate(15);

        return view('documents.pending', compact('pendingDocuments', 'projectId'));
    }

    /**
     * Get all returned documents
     */
    public function returnedDocuments($projectId = null)
    {
        $query = Document::returned();

        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        $returnedDocuments = $query->latest('returned_at')->paginate(15);

        return view('documents.returned', compact('returnedDocuments', 'projectId'));
    }

    /**
     * Filter documents by status and search criteria
     */
    public function filterDocuments(Request $request, $projectId = null)
    {
        $query = Document::query();

        // Filter by project if provided
        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        // Filter by return status
        $status = $request->query('status');
        if ($status === 'returned') {
            $query->returned();
        } elseif ($status === 'pending') {
            $query->pending();
        }

        // Apply search filter if provided
        $search = $request->query('search');
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('serial_no', 'like', "%{$search}%")
                    ->orWhere('payee', 'like', "%{$search}%")
                    ->orWhere('particulars', 'like', "%{$search}%")
                    ->orWhere('remarks', 'like', "%{$search}%");
            });
        }

        $documents = $query->latest('date_created')->paginate(15);

        return response()->json([
            'data' => $documents->items(),
            'pagination' => [
                'total' => $documents->total(),
                'per_page' => $documents->perPage(),
                'current_page' => $documents->currentPage(),
                'last_page' => $documents->lastPage(),
            ],
        ]);
    }
}
