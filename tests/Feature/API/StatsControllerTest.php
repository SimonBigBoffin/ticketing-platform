<?php

namespace Tests\Feature\API;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_stats_endpoint_returns_correct_data(): void
    {
        $user = User::factory()->create();
        Ticket::factory()->count(5)->create(['status' => false, 'user_id' => $user->id]);
        Ticket::factory()->count(3)->create(['status' => true, 'user_id' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/stats');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'total_tickets',
                'unprocessed_tickets',
                'last_ticket_processed' => ['updated_at'],
                'highest_ticket_user' => [
                    'user' => ['name', 'email'],
                    'total_tickets',
                ],
            ]);
    }
}
