<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\AgeGroup;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create age groups
        $ageGroups = [
            ['name' => '0-3 Years', 'slug' => '0-3-years', 'min_age' => 0, 'max_age' => 3, 'order' => 1],
            ['name' => '3-6 Years', 'slug' => '3-6-years', 'min_age' => 3, 'max_age' => 6, 'order' => 2],
            ['name' => '6-9 Years', 'slug' => '6-9-years', 'min_age' => 6, 'max_age' => 9, 'order' => 3],
            ['name' => '9-12 Years', 'slug' => '9-12-years', 'min_age' => 9, 'max_age' => 12, 'order' => 4],
            ['name' => '12+ Years', 'slug' => '12-plus-years', 'min_age' => 12, 'max_age' => null, 'order' => 5],
        ];
        
        foreach ($ageGroups as $ageGroup) {
            AgeGroup::create($ageGroup);
        }
        
        // Create categories
        $categories = [
            ['name' => 'Stuffed Toys', 'slug' => 'stuffed-toys', 'order' => 1],
            ['name' => 'Educational Toys', 'slug' => 'educational-toys', 'order' => 2],
            ['name' => 'Outdoor Toys', 'slug' => 'outdoor-toys', 'order' => 3],
            ['name' => 'Building Blocks', 'slug' => 'building-blocks', 'order' => 4],
            ['name' => 'Puzzles', 'slug' => 'puzzles', 'order' => 5],
            ['name' => 'Arts & Crafts', 'slug' => 'arts-crafts', 'order' => 6],
            ['name' => 'Board Games', 'slug' => 'board-games', 'order' => 7],
            ['name' => 'Dolls & Accessories', 'slug' => 'dolls-accessories', 'order' => 8],
            ['name' => 'Remote Control Toys', 'slug' => 'remote-control-toys', 'order' => 9],
            ['name' => 'Baby & Toddler Toys', 'slug' => 'baby-toddler-toys', 'order' => 10],
            ['name' => 'Traditional dolls', 'slug' => 'traditional-dolls', 'order' => 11],
        ];
        
        foreach ($categories as $category) {
            Category::create($category);
        }
        
        // Create products
        Product::factory()->count(50)->create();
    }
}