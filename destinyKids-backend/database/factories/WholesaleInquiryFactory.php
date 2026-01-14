<?php

namespace Database\Factories;

use App\Models\WholesaleInquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WholesaleInquiry>
 */
class WholesaleInquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => $this->faker->company(),
            'contact_person' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'business_type' => $this->faker->randomElement(['retailer', 'distributor', 'online_shop']),
            'message' => $this->faker->paragraph(),
            'status' => 'pending',
            'admin_notes' => null,
        ];
    }
}
