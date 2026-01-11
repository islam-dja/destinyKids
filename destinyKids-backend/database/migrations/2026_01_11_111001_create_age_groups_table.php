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
            $table->string('name'); // e.g., '0-3 years', '3-6 years'
            $table->string('slug')->unique();
            $table->integer('min_age')->nullable();
            $table->integer('max_age')->nullable();
            $table->string('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('age_groups');
    }
};