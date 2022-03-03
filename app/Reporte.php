<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $table = 'finance_reporte';
    protected $primaryKey = 'id';
    protected $fillable = [
      'Ledger',
      'Presupuesto',
      'Periodo_Presupuestal',
      'Nivel_0_Cod',
      'Nivel_1_COD',
      'Nivel_1_DESC',
      'Nivel_2_COD',
      'Nivel_2_DESC',
      'Nivel_4_COD',
      'Nivel_4_DESC',
      'Mes_Contable_ID_MES',
      'Mes_Contable_mesN',
      'Fecha_Contable',
      'Año_Fiscal',
      'Moneda',
      'Unidad_COD',
      'Unidad_DESC',
      'Actividad_COD',
      'Actividad_DESC',
      'Sede_COD',
      'Sede_DESC',
      'Referencia_COD',
      'Referencia_DESC',
      'Linea_COD',
      'Linea_DESC',
      'Unidad_Negocio_PC_COD',
      'Unidad_Negocio_PC_DESC',
      'Proyecto_COD',
      'Proyecto_DESC',
      'Actividad_Proyecto_COD',
      'Actividad_Proyecto_DESC',
      'Cd_Fondo_COD',
      'Cd_Fondo_DESC',
      'Cuenta_COD',
      'Cuenta_DESC',
      'Glosa',
      'Desc_Origen_Doc',
      'Desc_Nro_Doc',
      'Desc_Tipo_Doc',
      'Registrador',
      'CliPro_Codigo',
      'CliPro_Nombre',
      'CliPro_Tipo_Doc',
      'CliPro_Númer_Doc',
      'Fecha_Factura',
      'Documento_Relacionado',
      'Moneda_Origen',
      'Fecha_Pago',
      'Igv_Tipo_Uso',
      'Importe2',
      'Importe_Dolares2',
      'CodCategoria',
      'Direccion',
      'Area',
      'TipoActividad',
      'Criterio',
      'Flujo',
      'ImporteS',
      'ImporteUSD',
      'Categoria'
    ];
}
