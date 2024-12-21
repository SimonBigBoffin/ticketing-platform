<?php

namespace Tests\Feature\API;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserTicketsControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_has_tickets(): void
    {
        $user = User::factory()->create();
        Ticket::factory()->count(10)->create(['user_id' => $user->id]);

        $response = $this->get('/api/users/'.$user->email.'/tickets?page=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'status', 'user_id', 'created_at', 'updated_at'],
            ],
            'links',
        ]);
        $response->assertJsonCount(3, 'data'); // Assuming 5 items per page
    }

    public function test_user_has_no_tickets(): void
    {
        $user = User::factory()->create();

        $response = $this->get('/api/users/'.$user->email.'/tickets?page=1');

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    public function test_user_does_not_exist(): void
    {
        $email = 'simon@bigboffin.com';

        $response = $this->get('/api/users/'.$email.'/tickets?page=1');

        $response->assertStatus(404);
    }
}
