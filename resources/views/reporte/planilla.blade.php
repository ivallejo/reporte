@extends('layouts.app')

@section('content')

<script type="text/javascript" src="{{ asset('js/planilla.js') }}"></script>

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script> -->
<!-- Latest compiled and minified CSS -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"> -->
<!-- Latest compiled and minified JavaScript -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script> -->

<div class="row">
  <div class="row ">
    <div class="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light">REPORTE DE EJECUCIÓN PRESUPUESTAL</h1>
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
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center" id="henedicejec2020"> ENE-DIC EJEC-2020 </th>
          <th class="text-center" id="henedicppto2021"> ENE-DIC PPTO-2021 </th>
          <th class="text-center" id="hejec2020meses"> ENE-JUN EJEC-2020 </th>
          <th class="text-center" id="havance2020"> Avance 2020 </th>
          <th class="text-center" id="hejec2021meses"> ENE-JUN EJEC-2021 </th>
          <th class="text-center" id="havance2021"> Avance 2021 </th>
          <th class="text-center" id="hvar2021montomeses">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center" id="hvar2021pocentajemeses">VAR-ENE-JUN-2020-2021 %</th>
        </tr>
      </thead>
      <tbody id="tbody">
      </tbody>
      <tfoot>
        <tr>
        <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center" id="fenedicejec2020"> ENE-DIC EJEC-2020 </th>
          <th class="text-center" id="fenedicppto2021"> ENE-DIC PPTO-2021 </th>
          <th class="text-center" id="fejec2020meses"> ENE-JUN EJEC-2020 </th>
          <th class="text-center" id="favance2020"> Avance 2020 </th>
          <th class="text-center" id="fejec2021meses"> ENE-JUN EJEC-2021 </th>
          <th class="text-center" id="favance2021"> Avance 2021 </th>
          <th class="text-center" id="fvar2021montomeses">VAR-ENE-JUN-2020-2021 Monto</th>
          <th class="text-center" id="fvar2021pocentajemeses">VAR-ENE-JUN-2020-2021 %</th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="mb-3"><button id="btnPreDownload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-download-alt"></i> Descargar </button></div>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">EVOLUCIÓN HEAD COUNT</h5>
        <button type="button" class="close" onclick="$('#exampleModal').modal('hide'); $('#msgError').hide();" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group row">
            <label for="colFormLabelSm" class="col-sm-6 col-form-label col-form-label-sm">PERSONAL DOCENTE:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control form-control-sm" id="HC1" value="0">
            </div>
            <div class="col-sm-3">
              <input type="number" class="form-control form-control-sm" id="HC2" value="0">
            </div>
          </div>
          <br>
          <div class="form-group row">
            <label for="colFormLabelSm" class="col-sm-6 col-form-label col-form-label-sm">PERSONAL NO DOCENTE:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control form-control-sm" id="HC3" value="0">
            </div>
            <div class="col-sm-3">
              <input type="number" class="form-control form-control-sm" id="HC4" value="0">
            </div>
          </div>
        </form>
        <br>

        <div id="msgError" class="alert alert-danger" role="alert" style="display:none">
          Ingrese los importes solicitados
        </div>

      </div>
      <div class="modal-footer">



        <button type="button" class="btn btn-secondary" onclick="$('#exampleModal').modal('hide'); $('#msgError').hide();" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnDownload">Descargar</button>
      </div>
    </div>
  </div>
</div>

@endsection
