<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $accounts = User::paginate(25)->withQueryString();
        return Inertia::render('accounts/index', [
            'accountList' => $accounts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function activate(User $account)
    {
        $account->update(['is_active' => true]);
        return redirect()->back()->with('success', 'Account activated successfully.');
    }

    public function deactivate(User $account)
    {
        $account->update(['is_active' => false]);
        return redirect()->back()->with('success', 'Account deactivated successfully.');
    }

    public function toggleAdmin(User $account)
    {
        $account->update(['is_admin' => !$account->is_admin]);
        return redirect()->back()->with('success', 'Admin status updated successfully.');
    }
}
