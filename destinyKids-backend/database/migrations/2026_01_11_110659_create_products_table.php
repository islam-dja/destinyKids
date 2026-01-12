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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('name', 200);
            $table->string('slug', 220)->unique();
            $table->string('sku', 50)->unique()->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->decimal('price', 10, 2); // 10 digits total, 2 decimal places
            $table->decimal('compare_price', 10, 2)->nullable(); // For showing "original price"
            $table->decimal('cost_price', 10, 2)->nullable(); // For profit calculation
            $table->string('age_group', 50)->nullable(); // e.g., '3-5 years', '6-8 years'
            $table->integer('stock_quantity')->default(0);
            $table->integer('low_stock_threshold')->default(5);
            $table->boolean('track_stock')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->boolean('is_b2b_eligible')->default(false); // For future B2B pricing
            $table->decimal('b2b_price', 10, 2)->nullable(); // Special price for B2B
            $table->integer('min_b2b_quantity')->nullable(); // Minimum quantity for B2B price
            $table->integer('weight_grams')->nullable(); // For shipping calculation
            $table->json('dimensions')->nullable(); // {length, width, height} in cm
            $table->json('images')->nullable(); // Array of image paths
            $table->string('main_image')->nullable();
            $table->json('attributes')->nullable(); // Custom attributes as JSON
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for performance
            $table->index(['is_published', 'is_featured']);
            $table->index(['category_id', 'is_published']);
            $table->index(['price', 'is_published']);
            $table->index(['stock_quantity', 'track_stock']);
            $table->index(['created_at', 'is_published']);
            $table->index('sku');
            $table->index('age_group');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};