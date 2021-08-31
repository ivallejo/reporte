@extends('layouts.app')

@section('content')
<script type="text/javascript" src="{{ asset('js/reporteproyeccioningresos.js') }}"></script>

<div class="row">
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtprocedencia" class="form-control" placeholder="Procedencia">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtcartera" class="form-control" placeholder="Cartera">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txttipoPrograma" class="form-control" placeholder="Tipo Programa">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtdetalle" class="form-control" placeholder="Detalle">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtnombrePrograma" class="form-control" placeholder="NombrePrograma">
    </div>
  </div>

</div>

<div class="row">
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtchartfields" class="form-control" placeholder="Chartfields">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtcodunidad" class="form-control" placeholder="CodUnidad">
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtcodnivel4" class="form-control" placeholder="CodNivel4">
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
  <div class="table-responsive element-animate pointer" style="font-size: 11px;">
  <table id="dataTable" cellpadding="0" cellspacing="0" border="0" class=" datatable table table-striped table-bordered">
    <thead>
      <tr>
        <th class="text-center">Procedencia</th>
        <th class="text-center">Cartera</th>
        <th class="text-center">Tipo Prog.</th>
        <th class="text-center">Detalle</th>
        <th class="text-center">Programa</th>
        <th class="text-center">Chartfields</th>
        <th class="text-center">Cod. Unidad</th>
        <th class="text-center">Cod. Nivel 4</th>
        <th class="text-center">Chartfields + Partida</th>
        <th class="text-center">Status</th>
        <th class="text-center"></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
    <tfoot>
      <tr>
        <th class="text-center">Procedencia</th>
        <th class="text-center">Cartera</th>
        <th class="text-center">Tipo Prog.</th>
        <th class="text-center">Detalle</th>
        <th class="text-center">Programa</th>
        <th class="text-center">Chartfields</th>
        <th class="text-center">Cod. Unidad</th>
        <th class="text-center">Cod. Nivel 4</th>
        <th class="text-center">Chartfields + Partida</th>
        <th class="text-center">Status</th>
        <th class="text-center"></th>
      </tr>
    </tfoot>
  </table>
  </div>
</div>


@endsection