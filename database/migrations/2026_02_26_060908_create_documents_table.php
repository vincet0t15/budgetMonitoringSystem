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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_created');
            $table->text('payee');
            $table->text('particulars')->nullable();
            $table->text('serial_no');
            $table->text('fpp');
            $table->text('account_code');
            $table->text('ammount');
            $table->text('remarks')->nullable();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
