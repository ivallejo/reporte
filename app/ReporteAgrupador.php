<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReporteAgrupador extends Model
{
    protected $table = 'reporte_agrupador';
    protected $primaryKey = 'id';
    protected $fillable = [
      'agrupador1',
      'agrupador2',
      'agrupador3',
      'partida',
      'desc_nivel_4',
      'order_reporte'
    ];
}
