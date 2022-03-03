<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReporteProyeccionIngresos extends Model
{
    protected $table = 'finance_reporte_proyeccion_ingresos';
    protected $primaryKey = 'id';
    protected $fillable = [
      'Procedencia',
      'Cartera',
      'TipoPrograma',
      'Detalle',
      'NombrePrograma',
      'Chartfields',
      'CodUnidad',
      'CodNivel4',
      'ChartfieldsPartida',
      'Status'
    ];
}
