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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique(); // e.g., ORD-2026-00001
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // Null for guest checkout
            
            // Guest information (if user_id is null)
            $table->json('guest_info')->nullable(); // {name, email, phone}
            
            // Order totals
            $table->decimal('subtotal', 10, 2);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            
            // Status tracking
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_method', ['cod'])->default('cod'); // Cash on Delivery only for now
            $table->enum('payment_status', ['unpaid', 'paid'])->default('unpaid');
            
            // Shipping information
            $table->json('shipping_address'); // {name, phone, wilaya, commune, address, postal_code}
            $table->text('notes')->nullable(); // Customer notes
            $table->text('admin_notes')->nullable(); // Internal admin notes
            
            $table->timestamps();
            
            // Indexes
            $table->index('order_number');
            $table->index(['user_id', 'created_at']);
            $table->index(['status', 'created_at']);
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
