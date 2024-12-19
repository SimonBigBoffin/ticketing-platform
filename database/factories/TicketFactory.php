<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subject' => fake()->sentence(),
            'content' => fake()->paragraph(),
        ];
    }

    public function randomCreated(): TicketFactory|Factory
    {
        $createdAt = fake()->dateTimeBetween('-30 days', 'now');
        return $this->state(function (array $attributes) use ($createdAt) {
            return [
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ];
        });
    }
}
