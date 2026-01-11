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
        Schema::table('products', function (Blueprint $table) {
            // Add age_group_id foreign key
            $table->foreignId('age_group_id')
                  ->nullable()
                  ->after('category_id')
                  ->constrained('age_groups')
                  ->nullOnDelete();
            
            // Add index for age_group_id
            $table->index('age_group_id');
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
    }
};