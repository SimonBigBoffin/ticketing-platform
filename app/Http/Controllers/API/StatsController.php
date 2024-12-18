<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Gather Stats from the platform
        // - Total number of tickets
        // - Total number of unprocessed tickets
        // - Name & Email of user with the highest number of submitted tickets
        // - Timestamp of the last ticket processed

        $total_tickets = Ticket::all()->count();
        $unprocessed_tickets = Ticket::where('status', false)->count();
        $highest_ticket_user = null;
        $last_ticket_processed = null;

        return response()->json([
            'total_tickets' => $total_tickets,
            'unprocessed_tickets' => $unprocessed_tickets,
            'highest_ticket_user' => $highest_ticket_user,
            'last_ticket_processed' => $last_ticket_processed,
        ]);

    }

}
