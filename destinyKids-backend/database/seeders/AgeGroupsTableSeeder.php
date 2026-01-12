<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgeGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ageGroups = [
            ['name' => '0-2 years', 'slug' => '0-2-years', 'min_age' => 0, 'max_age' => 24, 'order' => 1],
            ['name' => '3-5 years', 'slug' => '3-5-years', 'min_age' => 36, 'max_age' => 60, 'order' => 2],
            ['name' => '6-8 years', 'slug' => '6-8-years', 'min_age' => 72, 'max_age' => 96, 'order' => 3],
            ['name' => '10+ years', 'slug' => '10-plus-years', 'min_age' => 120, 'max_age' => null, 'order' => 4],
        ];

        foreach ($ageGroups as $group) {
            DB::table('age_groups')->insert(array_merge($group, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $this->command->info('Age groups seeded successfully!');
    }
}