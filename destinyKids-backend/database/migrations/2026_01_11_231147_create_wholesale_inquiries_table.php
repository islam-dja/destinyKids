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
        Schema::create('wholesale_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone');
            $table->string('business_type')->nullable(); // e.g., 'retailer', 'distributor', 'online_shop'
            $table->text('message');
            $table->enum('status', ['new', 'reviewed', 'contacted', 'converted', 'rejected'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('created_at');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wholesale_inquiries');
    }
};
