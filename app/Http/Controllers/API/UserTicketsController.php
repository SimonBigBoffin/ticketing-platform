<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class UserTicketsController extends Controller
{
    public function index(Request $request)
    {

        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $status = false;
        $email = $request->input('email', '');

        if (empty($email)) {
            return response()->json([]);
        }

        $page = $request->input('page', 1);
        $status_filter = $request->input('status_filter', 'open');

        if ($status_filter == 'close') {
            $status = true;
        }

        $tickets = Ticket::with(['user'])
            ->where('status', $status)
            ->latest()
            ->paginate($perPage, $columns, $pageName, $page);


        return response()->json($tickets);
    }
}
