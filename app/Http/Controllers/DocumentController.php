<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        dd(1);
        $request->validate([
            'payee' => 'required|string|max:255',
            'particulars' => 'nullable|string|max:255',
            'fpp' => 'nullable|string|max:255',
            'account_code' => 'nullable|string|max:255',
            'ammount' => 'required|numeric',
            'project_id' => 'required|exists:projects,id',
        ]);

        $request->user()->documents()->create($request->all());

        return redirect()->back()->with('success', 'Document created successfully.');
    }
}
