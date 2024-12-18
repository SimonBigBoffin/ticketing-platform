<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function show(Ticket $ticket)
    {
        return Inertia::render('Ticket', [
            'ticket' => $ticket
        ]);
    }

}
