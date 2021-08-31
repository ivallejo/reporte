<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumsReporte extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reporte', function (Blueprint $table) {
            //
            $table->string('CodCategoria')->nullable();
            $table->string('Direccion')->nullable();
            $table->string('Area')->nullable();
            $table->string('TipoActividad')->nullable();
            $table->string('Criterio')->nullable();
            $table->string('Flujo')->nullable();
            $table->string('ImporteS')->nullable();
            $table->string('ImporteUSD')->nullable();
            $table->string('Categoria')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reporte', function (Blueprint $table) {
            //
        });
    }
}
