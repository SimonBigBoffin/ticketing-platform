<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {

        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $status = false;

        $page = $request->input('page', 1);
        $statusFilter = $request->input('status_filter', 'open');
        $userEmail = $request->input('email', '');

        if ($statusFilter == 'close') {
            $status = true;
        }

        $query = Ticket::with(['user'])
            ->where('status', $status);

        if ($userEmail != '') {
            $query->whereHas('user', function ($query) use ($userEmail) {
                $query->where('email', $userEmail);
            });
        }

        $tickets = $query->latest()->paginate($perPage, $columns, $pageName, $page);

        return response()->json($tickets);
    }

    public function open(Request $request)
    {
        $openTickets = Ticket::with(['user'])
            ->where('status', 0)
            ->latest()
            ->paginate();

        return response()->json($openTickets);

    }

    public function closed(Request $request)
    {
        $closedTickets = Ticket::with(['user'])
            ->where('status', 1)
            ->latest()
            ->paginate();

        return response()->json($closedTickets);

    }
}
