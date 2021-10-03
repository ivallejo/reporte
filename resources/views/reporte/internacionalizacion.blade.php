@extends('layouts.app')

@section('content')

<script type="text/javascript" src="{{ asset('js/internacionalizacion.js') }}"></script>

<div class="row">
  <div class="row ">
    <div class="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light">REPORTE DE EJECUCIÓN PRESUPUESTAL 2021</h1>
      <!-- <p class="lead text-muted"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis perferendis, tenetur aliquid, voluptatum sint dolores enim atque in voluptas minima illum magni optio. Eligendi maxime porro quia atque in vero.</p> -->
      <!-- <p> -->
        <!-- <div class="mb-3"><button id="upload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-download-alt"></i> Descargar </button></div> -->
      <!-- </p> -->
    </div>
  </div>
</div>

<div class="row text-center">
 
  <div class="col-3"></div>

  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <label class="form-control" for="">AÑO</label>
      <select class="selectpicker cmbano form-select" id="ano" aria-label="Default select example">
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <label class="form-control" for="">Desde</label>
      <select class="selectpicker cmbmesDesde form-select"  id="mesDesde">
        <option value="1">ENERO</option>
        <option value="2">FEBRERO</option>
        <option value="3">MARZO</option>
        <option value="4">ABRIL</option>
        <option value="5">MAYO</option>
        <option value="6">JUNIO</option>
        <option value="7">JULIO</option>
        <option value="8">AGOSTO</option>
        <option value="9">SEPTIEMBRE</option>
        <option value="10">OCTUBRE</option>
        <option value="11">NOVIEMBRE</option>
        <option value="12">DICIEMBRE</option>
      </select>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <label  class="form-control" for="">Hasta</label>
      <select class="selectpicker cmbmesHasta form-select"  id="mesHasta">
        <option value="1">ENERO</option>
        <option value="2">FEBRERO</option>
        <option value="3">MARZO</option>
        <option value="4">ABRIL</option>
        <option value="5">MAYO</option>
        <option value="6">JUNIO</option>
        <option value="7">JULIO</option>
        <option value="8">AGOSTO</option>
        <option value="9">SEPTIEMBRE</option>
        <option value="10">OCTUBRE</option>
        <option value="11">NOVIEMBRE</option>
        <option value="12">DICIEMBRE</option>
      </select>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="form-group mb-3">
        <button type="button" id="btnSearch" class="btn btn-primary-app ml-1 btnsearch"><i class="fas fa-plus-search"></i> Buscar </button>
    </div>
  </div>

  <!-- <div class="col-3"></div> -->

</div>

<div id="divupdate" class="row ">
  <div class="table-responsive">
  <table id="dataTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered" style="font-size: 12px;">
      <thead>
        <tr>
          <th class="text-center">DIRECCION</th>
          <th class="text-center">UNIDAD</th>
          <th class="text-center">PARTIDA</th>
          <th class="text-center">DESCRIPCION</th>
          <th class="text-center">PPTO-ANUAL-2021 INGRESOS</th>
          <th class="text-center">PPTO-ANUAL-2021 EGRESOS</th>
          <th class="text-center" id="hejecutadoingresos">EJECUTADO ENE-JUN INGRESOS</th>
          <th class="text-center" id="hejecutadoegresos">EJECUTADO ENE-JUN EGRESOS</th>
          <th class="text-center">COMPROMISOS INGRESOS</th>
          <th class="text-center">COMPROMISOS EGRESOS</th>
          <th class="text-center">SALDO 2021 INGRESOS</th>
          <th class="text-center">SALDO 2021 EGRESOS</th>
          <th class="text-center">AVANCE 2021 (%) INGRESOS</th>
          <th class="text-center">AVANCE 2021 (%) EGRESOS</th>
        </tr>
      </thead>
      <tbody id="tbody">
      </tbody>
      <tfoot>
        <tr>
          <th class="text-center">DIRECCION</th>
          <th class="text-center">UNIDAD</th>
          <th class="text-center">PARTIDA</th>
          <th class="text-center">DESCRIPCION</th>
          <th class="text-center">PPTO-ANUAL-2021 INGRESOS</th>
          <th class="text-center">PPTO-ANUAL-2021 EGRESOS</th>
          <th class="text-center" id="fejecutadoingresos">EJECUTADO ENE-JUN INGRESOS</th>
          <th class="text-center" id="fejecutadoegresos">EJECUTADO ENE-JUN EGRESOS</th>
          <th class="text-center">COMPROMISOS INGRESOS</th>
          <th class="text-center">COMPROMISOS EGRESOS</th>
          <th class="text-center">SALDO 2021 INGRESOS</th>
          <th class="text-center">SALDO 2021 EGRESOS</th>
          <th class="text-center">AVANCE 2021 (%) INGRESOS</th>
          <th class="text-center">AVANCE 2021 (%) EGRESOS</th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="mb-3"><button id="btnDownload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-download-alt"></i> Descargar </button></div>
</div>

@endsection