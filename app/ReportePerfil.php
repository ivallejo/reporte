<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportePerfil extends Model
{
    protected $table = 'finance_reporte_perfil';
    protected $primaryKey = 'id';
    protected $fillable = [
      'Perfil',
      'Unidad',
      'Actividad',
      'Sede',
      'CodReferencia'
    ];
}
