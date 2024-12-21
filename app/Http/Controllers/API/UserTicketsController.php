<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserTicketsController extends Controller
{
    /**
     * @throws \Exception
     */
    public function index(Request $request, $email = '')
    {
        $perPage = 3;
        $columns = ['*'];
        $pageName = 'page';
        $status = false;

        if (empty($email)) {
            return response('', 404);
        }

        $page = $request->input('page', 1);
        $status_filter = $request->input('status_filter', 'open');

        if ($status_filter == 'close') {
            $status = true;
        }

        $user = User::with(['tickets'])->where('email', $email)->first();

        //dd($user->tickets->paginate($perPage));

        if ($user) {
            return response()->json($user->tickets->paginate($perPage));
        }

        return response()->json(['message' => 'No User on Record'], 404);

    }
}
