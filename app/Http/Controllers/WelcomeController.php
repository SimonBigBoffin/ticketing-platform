<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Welcome', [
            'users' =>  User::fetchDropdown(),
        ]);
    }
}
