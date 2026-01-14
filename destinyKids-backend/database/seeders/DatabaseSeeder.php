<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategoriesTableSeeder::class,
            AgeGroupsTableSeeder::class,
            // ProductsTableSeeder::class, // Will create in next step
        ]);
    }
}