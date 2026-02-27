<?php

namespace App\Http\Controllers;

use App\Models\Project;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia('Projects/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $request->user()->projects()->create($request->all());

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function show(Request $request, Project $project)
    {
        abort_if($project->user_id !== Auth::id(), 403);

        $search = $request->query('search');
        $statusId = $request->query('statusId');

        $query = $project->documents()->with('receivedBackDocuments');


        if ($statusId === 'return') {
            $query->returned();
        } elseif ($statusId === 'not_return') {
            $query->pending();
        }


        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('serial_no', 'like', "%{$search}%")
                    ->orWhere('payee', 'like', "%{$search}%")
                    ->orWhere('particulars', 'like', "%{$search}%")
                    ->orWhere('remarks', 'like', "%{$search}%");
            });
        }

        $documents = $query->latest('date_created')->paginate(50);

        return inertia('project/show', [
            'project' => $project,
            'documents' => $documents,
            'filters' => [
                'search' => $search,
                'statusId' => $statusId,
            ],
        ]);
    }
}
