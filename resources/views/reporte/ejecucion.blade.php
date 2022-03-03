@extends('layouts.app')

@section('content')

<script type="text/javascript" src="{{ asset('js/ejecucion.js') }}"></script>

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script> -->

<!-- Latest compiled and minified CSS -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"> -->

<!-- Latest compiled and minified JavaScript -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script> -->

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script> -->

<div class="row">
  <div class="row ">
    <div class="col-12 text-center">
      <h1 class="fw-light">REPORTE DE EJECUCIÓN PRESUPUESTAL</h1>
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
          <th class="text-center">AGRUPADOR</th>
          <th class="text-center">CONCEPTO</th>
          <th class="text-center">FAMILIA DE PARTIDA</th>
          <th class="text-center">DETALLE</th>
          <th class="text-center">EJEC-2020 ENE-DIC</th>
          <th class="text-center">PPTO-2021 ENE-DIC</th>
          <th class="text-center" id="hejec2020meses">EJEC-2020 ENE-JUN</th>
          <th class="text-center">AVANCE 2020</th>
          <th class="text-center" id="hejec2021meses">EJEC-2021 ENE-JUN</th>
          <th class="text-center">Avance-EJEC 2021</th>
          <th class="text-center">COMPROMISOS* 2021</th>
          <th class="text-center">EJEC+COMP 2021</th>
          <th class="text-center" id="hvar2021montomeses">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center" id="hvar2021pocentajemeses">VAR-ENE-JUN-2020-2021 %</th>
          <th class="text-center">SALDO-2021 Monto</th>
          <th class="text-center">SALDO-2021 %</th>


        </tr>
      </thead>
      <tbody id="tbody">
      </tbody>
      <tfoot>
        <tr>
          <th class="text-center">AGRUPADOR</th>
          <th class="text-center">CONCEPTO</th>
          <th class="text-center">FAMILIA DE PARTIDA</th>
          <th class="text-center">DETALLE</th>
          <th class="text-center">EJEC2020 ENEDIC</th>
          <th class="text-center">PPTO2021 ENEDIC</th>
          <th class="text-center" id="fejec2020meses">EJEC-2020 ENE-JUN</th>
          <th class="text-center">AVANCE 2020</th>
          <th class="text-center" id="fejec2021meses">EJEC-2021 ENE-JUN</th>
          <th class="text-center">Avance-EJEC 2021</th>
          <th class="text-center">COMPROMISOS* 2021</th>
          <th class="text-center">EJEC+COMP 2021</th>
          <th class="text-center" id="fvar2021montomeses">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center" id="fvar2021pocentajemeses">VAR-ENE-JUN-2020-2021 %</th>
          <th class="text-center">SALDO-2021 Monto</th>
          <th class="text-center">SALDO-2021 %</th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="mb-3"><button id="btnDownload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-download-alt"></i> Descargar </button></div>
</div>

@endsection