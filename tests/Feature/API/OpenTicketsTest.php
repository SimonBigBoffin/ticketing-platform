<?php

namespace Tests\Feature\API;

use App\Models\Ticket;
use App\Models\User;
use Database\Factories\TicketFactory;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OpenTicketsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_api_open_tickets(): void
    {
        $user = User::factory()->create();
        Ticket::factory()->count(5)->create([
            'user_id' => $user->id,
        ]);

        $response = $this->get('/api/tickets/open');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }

    public function test_api_open_tickets_with_no_tickets(): void
    {

        $response = $this->get('/api/tickets/open');

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');

    }
}
