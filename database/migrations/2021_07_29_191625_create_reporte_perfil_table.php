<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportePerfilTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporte_perfil', function (Blueprint $table) {
            $table->id();
            $table->string('Perfil');
            $table->string('Unidad');
            $table->string('Actividad');
            $table->string('Sede');
            $table->string('CodReferencia');
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
        Schema::dropIfExists('reporte_perfil');
    }
}
