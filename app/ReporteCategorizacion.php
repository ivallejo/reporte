<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReporteCategorizacion extends Model
{
    protected $table = 'finance_reporte_categorizacion';
    protected $primaryKey = 'id';
    protected $fillable = [
      'Chartfield',
      'Categoria',
      'Direccion',
      'Area',
      'TipoActividad'
    ];
}
