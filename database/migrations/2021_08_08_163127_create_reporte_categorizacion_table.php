<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReporteCategorizacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporte_categorizacion', function (Blueprint $table) {
            $table->id();
            $table->string('Chartfield');
            $table->string('Categoria');
            $table->string('Direccion');
            $table->string('Area');
            $table->string('TipoActividad');
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
        Schema::dropIfExists('reporte_categorizacion');
    }
}
