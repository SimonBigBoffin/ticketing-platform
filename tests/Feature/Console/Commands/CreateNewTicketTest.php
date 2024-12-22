<?php

namespace Tests\Feature\Console\Commands;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CreateNewTicketTest extends TestCase
{
    use DatabaseTransactions;

    public function test_create_new_ticket_command(): void
    {
        User::factory(10)->create();

        // Call the artisan command to create a new ticket
        $this->artisan('app:create-new-ticket')
            ->expectsOutput('Ticket created successfully')
            ->assertExitCode(0);

        // Assert that the ticket was created successfully
        $this->assertDatabaseCount(Ticket::class, 1);
    }
}
