@extends('layouts.app')

@section('content')
<script type="text/javascript" src="{{ asset('js/reportecategorizacion.js') }}"></script>

<div class="row">
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtchartfield" class="form-control" placeholder="Chartfield">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtcategoria" class="form-control" placeholder="Categoria">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtdireccion" class="form-control" placeholder="Direccion">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtarea" class="form-control" placeholder="Area">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txttipoactividad" class="form-control" placeholder="TipoActividad">
    </div>
  </div>
  
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="form-group">
        <button type="button" id="btnAdd" class="btn btn-primary-app ml-1 addattention"><i class="fas fa-plus-circle"></i> Registrar </button>
    </div>
  </div>
</div>

<br>

<div class="row text-start">
  <div class="col-md-12 form-group element-animate pointer">
  <table id="dataTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
    <thead>
      <tr>
        <th class="text-center">Chartfield</th>
        <th class="text-center">Categoría</th>
        <th class="text-center">Dirección</th>
        <th class="text-center">Área</th>
        <th class="text-center">Tipo Actividad</th>
        <th class="text-center"></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
    <tfoot>
      <tr>
        <th class="text-center" style="padding-right:30px">Chartfield</th>
        <th class="text-center" style="padding-right:30px">Categoría</th>
        <th class="text-center" style="padding-right:30px">Dirección</th>
        <th class="text-center" style="padding-right:30px">Área</th>
        <th class="text-center" style="padding-right:30px">Tipo Actividad</th>
        <th class="text-center"></th>
      </tr>
    </tfoot>
  </table>
  </div>
</div>


@endsection