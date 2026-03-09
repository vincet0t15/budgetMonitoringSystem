<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

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
    Route::get('documents/register/{project}', [DocumentController::class, 'register'])->name('documents.register');
    Route::get('documents/{document}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::delete('documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::middleware('admin')->group(function () {
        //ACCOUNTS
        Route::get('accounts', [AccountController::class, 'index'])->name('accounts.index');
        Route::post('accounts', [AccountController::class, 'store'])->name('accounts.store');
        Route::put('accounts/{account}', [AccountController::class, 'update'])->name('accounts.update');
        Route::get('accounts/{account}', [AccountController::class, 'show'])->name('accounts.show');
        Route::delete('accounts/{account}', [AccountController::class, 'destroy'])->name('accounts.destroy');
        Route::put('accounts/{account}/activate', [AccountController::class, 'activate'])->name('accounts.activate');
        Route::put('accounts/{account}/deactivate', [AccountController::class, 'deactivate'])->name('accounts.deactivate');
        Route::put('accounts/{account}/toggle-admin', [AccountController::class, 'toggleAdmin'])->name('accounts.toggle-admin');

        //OFFICES
        Route::get('offices', [OfficeController::class, 'index'])->name('offices.index');
        Route::post('offices', [OfficeController::class, 'store'])->name('offices.store');
        Route::put('offices/{office}', [OfficeController::class, 'update'])->name('offices.update');
        Route::delete('offices/{office}', [OfficeController::class, 'destroy'])->name('offices.destroy');
    });
});

require __DIR__ . '/settings.php';
