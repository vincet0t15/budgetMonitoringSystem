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
        $documents = $project->documents()
            ->latest()
            ->paginate(10);

        return inertia('project/show', [
            'project' => $project,
            'documents' => $documents,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
