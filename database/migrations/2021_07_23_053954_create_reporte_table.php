<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReporteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reporte', function (Blueprint $table) {

            $table->id();
            $table->string('Ledger')->nullable();
            $table->string('Presupuesto')->nullable();
            $table->string('Periodo_Presupuestal')->nullable();
            $table->string('Nivel_0_Cod')->nullable();
            $table->string('Nivel_1_COD')->nullable();
            $table->string('Nivel_1_DESC')->nullable();
            $table->string('Nivel_2_COD')->nullable();
            $table->string('Nivel_2_DESC')->nullable();
            $table->string('Nivel_4_COD')->nullable();
            $table->string('Nivel_4_DESC')->nullable();
            $table->string('Mes_Contable_ID_MES')->nullable();
            $table->string('Mes_Contable_mesN')->nullable();
            $table->string('Fecha_Contable')->nullable();
            $table->string('Año_Fiscal')->nullable();
            $table->string('Moneda')->nullable();
            $table->string('Unidad_COD')->nullable();
            $table->string('Unidad_DESC')->nullable();
            $table->string('Actividad_COD')->nullable();
            $table->string('Actividad_DESC')->nullable();
            $table->string('Sede_COD')->nullable();
            $table->string('Sede_DESC')->nullable();
            $table->string('Referencia_COD')->nullable();
            $table->string('Referencia_DESC')->nullable();
            $table->string('Linea_COD')->nullable();
            $table->string('Linea_DESC')->nullable();
            $table->string('Unidad_Negocio_PC_COD')->nullable();
            $table->string('Unidad_Negocio_PC_DESC')->nullable();
            $table->string('Proyecto_COD')->nullable();
            $table->string('Proyecto_DESC')->nullable();
            $table->string('Actividad_Proyecto_COD')->nullable();
            $table->string('Actividad_Proyecto_DESC')->nullable();
            $table->string('Cd_Fondo_COD')->nullable();
            $table->string('Cd_Fondo_DESC')->nullable();
            $table->string('Cuenta_COD')->nullable();
            $table->string('Cuenta_DESC')->nullable();
            $table->string('Glosa')->nullable();
            $table->string('Desc_Origen_Doc')->nullable();
            $table->string('Desc_Nro_Doc')->nullable();
            $table->string('Desc_Tipo_Doc')->nullable();
            $table->string('Registrador')->nullable();
            $table->string('CliPro_Codigo')->nullable();
            $table->string('CliPro_Nombre')->nullable();
            $table->string('CliPro_Tipo_Doc')->nullable();
            $table->string('CliPro_Númer_Doc')->nullable();
            $table->string('Fecha_Factura')->nullable();
            $table->string('Documento_Relacionado')->nullable();
            $table->string('Moneda_Origen')->nullable();
            $table->string('Fecha_Pago')->nullable();
            $table->string('Igv_Tipo_Uso')->nullable();
            $table->string('Importe2')->nullable();
            $table->string('Importe_Dolares2')->nullable();
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
        Schema::dropIfExists('reporte');
    }
}
