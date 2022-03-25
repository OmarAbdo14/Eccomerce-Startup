<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_provider_id')
                ->constrained('service_providers')
                ->onDelete('cascade');
            $table->foreignId('product_type_id')
                ->nullable()
                ->constrained('product_types')
                ->nullOnDelete();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();
            $table->string('title');
            $table->string('desc');
            $table->decimal('price', 8,2);
            $table->decimal('offer_percent',8,2);
            $table->boolean('is_shipping');
            $table->integer('rate');
            $table->json('tags');
//            $table->json('comments');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
