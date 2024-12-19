<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{

    public function index(Request $request)
    {
        //dd($request->all());
        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $page = $request->input('page', 1);

        $tickets = Ticket::with(['user'])->where('status', false)->orderBy('created_at', 'DESC')->paginate($perPage, $columns, $pageName, $page);
        return Inertia::render('Welcome', [
            'tickets' => $tickets,
        ]);
    }
}
