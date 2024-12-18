<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    public function index(Request $request)
    {
        return Ticket::with(['user'])->where('status', false)->paginate(3);
    }

}
