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
}
