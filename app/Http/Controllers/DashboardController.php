<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Office;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::count();
        $totalDocuments = Document::count();
        $returnedDocuments = Document::returned()->count();
        $pendingDocuments = $totalDocuments - $returnedDocuments;
        $totalOffices = Office::count();
        $totalAccounts = User::count();

        // Get recent projects
        $recentProjects = Project::latest()->limit(5)->get();

        // Get recent documents
        $recentDocuments = Document::with('project')->latest()->limit(5)->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalDocuments' => $totalDocuments,
                'returnedDocuments' => $returnedDocuments,
                'pendingDocuments' => $pendingDocuments,
                'totalOffices' => $totalOffices,
                'totalAccounts' => $totalAccounts,
            ],
            'recentProjects' => $recentProjects,
            'recentDocuments' => $recentDocuments,
        ]);
    }
}
