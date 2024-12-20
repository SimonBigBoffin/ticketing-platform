<?php

namespace Tests\Unit;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function test_ticket_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $ticket->user);
        $this->assertEquals($user->id, $ticket->user->id);
    }

    public function test_ticket_has_status(): void
    {
        $ticket = Ticket::factory()->create();

        $this->assertFalse($ticket->status);
    }

    public function test_ticket_can_be_created(): void
    {
        $ticketData = [
            'subject' => 'Test ticket',
            'content' => 'Test content',
            'user_id' => User::factory()->create()->id,
            'status' => false,
        ];

        $ticket = Ticket::create($ticketData);

        $this->assertDatabaseHas('tickets', $ticketData);
        $this->assertInstanceOf(Ticket::class, $ticket);
    }
}
