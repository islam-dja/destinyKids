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
            
            // Foreign key to categories
            $table->foreignId('category_id')
                  ->nullable()
                  ->constrained('categories')
                  ->nullOnDelete();
            
            // Product details
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Pricing
            $table->decimal('price', 10, 2); // 10 digits, 2 decimal places
            $table->decimal('compare_at_price', 10, 2)->nullable(); // For sale prices
            
            // Stock management
            $table->integer('stock')->default(0);
            $table->string('sku')->unique()->nullable(); // Stock Keeping Unit
            $table->string('barcode')->nullable();
            
            // Product attributes
            $table->string('age_group')->nullable(); // e.g., '0-3', '3-6', '6-9', '9-12'
            $table->json('tags')->nullable(); // For additional categorization
            
            // Status flags
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->boolean('in_stock')->virtualAs('stock > 0');
            
            // Media
            $table->json('images')->nullable(); // Array of image URLs
            $table->string('main_image')->nullable();
            
            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes(); // For safe deletion
            
            // Indexes for performance
            $table->index('category_id');
            $table->index('price');
            $table->index('is_featured');
            $table->index('is_visible');
            $table->index(['is_visible', 'in_stock']);
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