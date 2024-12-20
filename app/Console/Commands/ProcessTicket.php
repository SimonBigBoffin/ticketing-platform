<?php

namespace App\Console\Commands;

use App\Models\Ticket;
use Illuminate\Console\Command;

class ProcessTicket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-ticket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'A simple command to process a ticket';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Find the newest unprocessed ticket
        $ticket = Ticket::with(['user'])->where('status', false)->orderBy('created_at', 'desc')->first();
        // Process the ticket
        $this->info('Processing ticket: ' . $ticket->user->email);
        $ticket->process();
        $this->info('Ticket processed successfully');
        // Send an email to the user that the ticket has been processed

    }
}
