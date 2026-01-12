<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('age_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50); // e.g., '0-2 years', '3-5 years'
            $table->string('slug', 60)->unique();
            $table->integer('min_age')->nullable(); // Minimum age in months
            $table->integer('max_age')->nullable(); // Maximum age in months
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
            
            $table->index(['is_active', 'order']);
        });

        // Add age_group_id to products table
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('age_group_id')->nullable()->after('category_id')
                  ->constrained('age_groups')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['age_group_id']);
            $table->dropColumn('age_group_id');
        });
        
        Schema::dropIfExists('age_groups');
    }
};