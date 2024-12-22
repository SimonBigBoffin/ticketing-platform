<?php

namespace Tests\Feature\Console\Commands;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ProcessTicketTest extends TestCase
{
    use DatabaseTransactions;

    public function test_processing_ticket_command(): void
    {
        $user = User::factory()->create();

        Ticket::factory()->create([
            'user_id' => $user->id,
            'status' => false,
        ]);

        $this->artisan('app:process-ticket')
            ->expectsOutput('Ticket processed successfully')
            ->assertExitCode(0);
    }
}
