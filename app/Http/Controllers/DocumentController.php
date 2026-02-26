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
        ]);

        Document::create($request->all());

        return redirect()->back()->with('success', 'Document created successfully.');
    }
}
