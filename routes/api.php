<?php

use App\Http\Controllers\API\StatsController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\UserTicketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public accessible api endpoints

Route::get('/stats', [StatsController::class, 'index']);

Route::get('/tickets/open', [TicketController::class, 'open']);
Route::get('/tickets/closed', [TicketController::class, 'closed']);
Route::get('/tickets', [TicketController::class, 'index']);

Route::get('/users/{email}/tickets', [UserTicketsController::class, 'index']);
