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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            
            $table->string('product_name'); // Snapshot at order time
            $table->string('product_sku')->nullable(); // Snapshot at order time
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2); // Price per item at order time
            $table->decimal('total_price', 10, 2); // unit_price * quantity
            
            $table->timestamps();
            
            // Indexes
            $table->index('order_id');
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
