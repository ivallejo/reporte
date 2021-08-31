<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportePerfil extends Model
{
    protected $table = 'reporte_perfil';
    protected $primaryKey = 'id';
    protected $fillable = [
      'Perfil',
      'Unidad',
      'Actividad',
      'Sede',
      'CodReferencia'
    ];
}
