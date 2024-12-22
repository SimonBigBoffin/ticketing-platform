<?php

namespace App\Console\Commands;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Console\Command;

class CreateNewTicket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-new-ticket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'A simple command to create a new ticket by a random user';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Will be used to create a new ticket by a random user every minute
        $user_ids = User::all()->pluck('id')->toArray();
        $pos = array_rand($user_ids);

        $user = User::find($user_ids[$pos]);

        Ticket::factory()->create([
            'subject' => 'Randomly created ticket for user '.$user->name,
            'content' => 'This is a randomly created ticket for user '.$user->name,
            'user_id' => $user->id,
        ]);

        $this->info('Ticket created successfully');
    }
}
