<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReporteAgrupadorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporte_agrupador', function (Blueprint $table) {
            $table->id();
            $table->string('agrupador1')->nullable();
            $table->string('agrupador2')->nullable();
            $table->string('agrupador3')->nullable();
            $table->string('partida')->nullable();
            $table->string('desc_nivel_4')->nullable();
            $table->integer('order_reporte')->nullable();
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
        Schema::dropIfExists('reporte_agrupador');
    }
}
