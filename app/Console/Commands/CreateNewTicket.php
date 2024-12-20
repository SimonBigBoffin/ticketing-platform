<?php

namespace App\Console\Commands;

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
        $this->info('Ticket created successfully');
    }
}
