<?php

namespace Tests\Feature\API;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTicketsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_has_tickets(): void
    {
        $user = User::factory()->create();
        Ticket::factory()->count(5)->create([
            'user_id' => $user->id,
        ]);

        $response = $this->get('/api/users/'.$user->email.'/tickets');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');

    }

    public function test_user_has_no_tickets(): void
    {
        $user = User::factory()->create();

        $response = $this->get('/api/users/'.$user->email.'/tickets');

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');

    }

    public function test_user_does_not_exist(): void
    {
        $email = 'simon@bigboffin.com';

        $response = $this->get('/api/users/'.$email.'/tickets');

        $response->assertStatus(404);

    }

}
