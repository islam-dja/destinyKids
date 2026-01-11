<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        $price = $this->faker->numberBetween(500, 10000); // DZD 500 to 10000
        
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $price,
            'compare_at_price' => $this->faker->boolean(30) ? $price * 1.2 : null, // 30% chance of having compare price
            'stock' => $this->faker->numberBetween(0, 200),
            'sku' => 'SKU-' . Str::upper(Str::random(8)),
            'barcode' => $this->faker->ean13(),
            'tags' => json_encode($this->faker->words(5)),
            'is_featured' => $this->faker->boolean(20), // 20% chance of being featured
            'is_visible' => $this->faker->boolean(85), // 85% chance of being visible
            'images' => json_encode([
                $this->faker->imageUrl(800, 800, 'toys', true, 'product'),
                $this->faker->imageUrl(800, 800, 'toys', true, 'product'),
                $this->faker->imageUrl(800, 800, 'toys', true, 'product'),
            ]),
            'main_image' => $this->faker->imageUrl(800, 800, 'toys', true, 'product'),
            'meta_title' => $this->faker->sentence(5),
            'meta_description' => $this->faker->sentence(15),
            'meta_keywords' => implode(', ', $this->faker->words(6)),
        ];
    }
}