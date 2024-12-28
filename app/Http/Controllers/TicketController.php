<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function show(Ticket $ticket)
    {
        return Inertia::render('Ticket', [
            'ticket' => $ticket->load('user'),
        ]);
    }

    public function close(Ticket $ticket)
    {
        $ticket->update(['status' => true]);

        return redirect()->route('welcome');
    }
}
