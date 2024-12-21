<?php

namespace Tests\Feature\Console\Commands;

use Tests\TestCase;

class CreateNewTicketTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_create_new_ticket_command(): void
    {
        // Call the artisan command to create a new ticket
        $this->artisan('app:create-new-ticket')
            ->expectsOutput('Ticket created successfully')
            ->assertExitCode(0);
    }
}
