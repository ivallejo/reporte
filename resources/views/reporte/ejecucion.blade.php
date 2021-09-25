@extends('layouts.app')

@section('content')

<script type="text/javascript" src="{{ asset('js/ejecucion.js') }}"></script>

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
          <th class="text-center">EJEC-2020 ENE-JUN</th>
          <th class="text-center">AVANCE 2020</th>
          <th class="text-center">EJEC-2021 ENE-JUN</th>
          <th class="text-center">Avance-EJEC 2021</th>
          <th class="text-center">COMPROMISOS* 2021</th>
          <th class="text-center">EJEC+COMP 2021</th>
          <th class="text-center">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center">VAR-ENE-JUN-2020-2021 %</th>
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
          <th class="text-center">EJEC-2020 ENE-JUN</th>
          <th class="text-center">AVANCE 2020</th>
          <th class="text-center">EJEC-2021 ENE-JUN</th>
          <th class="text-center">Avance-EJEC 2021</th>
          <th class="text-center">COMPROMISOS* 2021</th>
          <th class="text-center">EJEC+COMP 2021</th>
          <th class="text-center">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center">VAR-ENE-JUN-2020-2021 %</th>
          <th class="text-center">SALDO-2021 Monto</th>
          <th class="text-center">SALDO-2021 %</th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="mb-3"><button id="btnDownload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-download-alt"></i> Descargar </button></div>
</div>

@endsection