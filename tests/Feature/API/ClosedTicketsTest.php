<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ClosedTicketsTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic feature test example.
     */
    public function test_closed_tickets(): void
    {
        $response = $this->get('/api/tickets/closed');

        $response->assertStatus(200);
    }
}
