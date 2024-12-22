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

        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $page = $request->input('page', 1);

        $defaultOption = [
            'id' => 0,
            'name' => '-- Select User --',
            'email' => '',
        ];

        $users = User::get(['id', 'name', 'email']);


        return Inertia::render('Welcome', [
            'users' => array_merge([$defaultOption], $users->toArray()),
        ]);
    }
}
