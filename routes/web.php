<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified',])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Auth
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // project
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Document
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::post('documents/{document}/mark-returned', [DocumentController::class, 'markAsReturned'])->name('documents.mark-returned');
    Route::post('documents/{document}/mark-pending', [DocumentController::class, 'markAsPending'])->name('documents.mark-pending');
    Route::put('documents/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::post('documents/bulk-return', [DocumentController::class, 'bulkMarkAsReturned'])->name('documents.bulk-return');
    Route::post('documents/bulk-pending', [DocumentController::class, 'bulkMarkAsPending'])->name('documents.bulk-pending');
    Route::get('documents/filter/{projectId?}', [DocumentController::class, 'filterDocuments'])->name('documents.filter');
});

require __DIR__ . '/settings.php';
