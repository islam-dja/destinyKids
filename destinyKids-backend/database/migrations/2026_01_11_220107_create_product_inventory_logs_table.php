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
        Schema::create('product_inventory_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id'); //->constrained()->onDelete('cascade');
            $table->integer('old_quantity');
            $table->integer('new_quantity');
            $table->integer('change_amount'); // Positive for additions, negative for deductions
            $table->string('change_type', 50); // 'manual', 'order', 'restock', 'adjustment', 'return'
            $table->text('reason')->nullable();
            $table->foreignId('user_id')->nullable(); //->constrained()->onDelete('set null'); // Who made the change
            $table->foreignId('order_id')->nullable(); //->constrained()->onDelete('set null'); // If related to an order
            $table->json('metadata')->nullable(); // Additional data
            $table->timestamps();
            
            // Indexes for reporting
            $table->index(['product_id', 'created_at']);
            $table->index(['change_type', 'created_at']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_inventory_logs');
    }
};