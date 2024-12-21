<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {

        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $page = $request->input('page', 1);

        $tickets = Ticket::with(['user'])
            ->where('status', false)
            ->latest()
            ->paginate($perPage, $columns, $pageName, $page);

        return Inertia::render('Welcome', [
            'tickets' => $tickets,
        ]);
    }
}
