<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TicketPageTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic feature test example.
     */
    public function test_ticket_page(): void
    {
        // Arrange
        $user = User::factory()->create();
        $ticket = $user->tickets()->create([
            'subject' => 'Test ticket',
            'content' => 'Test content',
        ]);

        // Act
        $response = $this->get('/ticket/'.$ticket->id);

        // Assert
        $response->assertStatus(200);
        $response->assertSee($ticket->subject);
        $response->assertSee($ticket->content);
    }
}
