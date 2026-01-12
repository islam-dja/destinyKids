<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Educational Toys',
                'slug' => 'educational-toys',
                'description' => 'Toys that help children learn and develop skills',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Outdoor Toys',
                'slug' => 'outdoor-toys',
                'description' => 'Toys for outdoor play and physical activity',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Creative Arts',
                'slug' => 'creative-arts',
                'description' => 'Arts and crafts supplies for creative expression',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Building Blocks',
                'slug' => 'building-blocks',
                'description' => 'Construction and building toys',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Puzzles & Games',
                'slug' => 'puzzles-games',
                'description' => 'Board games, puzzles, and brain teasers',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Traditional Dolls',
                'slug' => 'traditional-dolls',
                'description' => 'Classic and cultural dolls for imaginative play',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Home Dolls',
                'slug' => 'home-dolls',
                'description' => 'Dolls and playsets for home roleplay',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Cars',
                'slug' => 'cars',
                'description' => 'Toy cars, vehicles, and racing sets',
                'order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert(array_merge($category, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $this->command->info('Categories seeded successfully!');
    }
}