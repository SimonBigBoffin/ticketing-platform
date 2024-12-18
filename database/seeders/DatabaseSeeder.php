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

        foreach(range(1, 10) as $i) {
            User::factory()
                ->has(Ticket::factory()->count(rand(1, 20)))
                ->create();
        }

    }
}
