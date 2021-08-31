<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReporteProyeccionIngresos extends Model
{
    protected $table = 'reporte_proyeccion_ingresos';
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
