<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Helps with populating the database this 10 users with a random amount of tickets in the last 30 days

        foreach(range(1, 10) as $i) {
            $ticketCount = rand(1, 20);

            $user = User::factory()
                ->create();

            foreach(range(1, $ticketCount) as $j) {
                Ticket::factory()->randomlyCreated()->create([
                    'user_id' => $user->id,
                ]);
            }

        }

    }
}
