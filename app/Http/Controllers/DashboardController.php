<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Office;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::where('user_id', Auth::user()->id)->count();
        $totalDocuments = Document::whereHas('project', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->count();

        $returnedDocuments = Document::whereHas('project', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })
            ->returned()
            ->count();

        $pendingDocuments = $totalDocuments - $returnedDocuments;
        $totalOffices = Office::count();
        $totalAccounts = User::count();

        // Get recent projects
        $recentProjects = Project::where('user_id', Auth::user()->id)
            ->latest()
            ->limit(5)
            ->get();

        // Get recent documents
        $recentDocuments = Document::with('project')
            ->whereHas('project', function ($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->latest()
            ->limit(5)
            ->get();

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
