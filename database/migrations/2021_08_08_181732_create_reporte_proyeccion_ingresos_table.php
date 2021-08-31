<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReporteProyeccionIngresosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporte_proyeccion_ingresos', function (Blueprint $table) {
            $table->id();
            $table->string('Procedencia');
            $table->string('Cartera');
            $table->string('TipoPrograma');
            $table->string('Detalle');
            $table->string('NombrePrograma');
            $table->string('Chartfields');
            $table->string('CodUnidad');
            $table->string('CodNivel4');
            $table->string('ChartfieldsPartida');
            $table->string('Status');
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
        Schema::dropIfExists('reporte_proyeccion_ingresos');
    }
}
