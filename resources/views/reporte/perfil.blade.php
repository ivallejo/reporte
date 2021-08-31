@extends('layouts.app')

@section('content')
<script type="text/javascript" src="{{ asset('js/reporteperfil.js') }}"></script>

<div class="row">
  <div class="col-lg-2 col-sm-12 col-md-2">
      <div class="form-group">
          <select class="form-select" id="cmbperfil" aria-label="Default select example">
            <option value="0" selected> -- Perfil -- </option>
            <option value="1">Perfil 1</option>
            <option value="2">Perfil 2</option>
            <option value="3">Perfil 3</option>
          </select>
      </div>
  </div>
</div>
<br>
<div class="row">
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtunidad" class="form-control" placeholder="Unidad">
      <div class="input-group-append">
        <button class="btn btn-outline-primary help" data-help="unidad" type="button"><i class="fas fa-search"></i> </button>
      </div>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtactividad" class="form-control" placeholder="Actividad">
      <div class="input-group-append">
        <button class="btn btn-outline-primary help" data-help="actividad" type="button"><i class="fas fa-search"></i> </button>
      </div>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtsede" class="form-control" placeholder="Sede">
      <div class="input-group-append">
        <button class="btn btn-outline-primary help" data-help="sede" type="button"><i class="fas fa-search"></i> </button>
      </div>
    </div>
  </div>
  <div class="col-lg-2 col-sm-12 col-md-2">
    <div class="input-group mb-3">
      <input type="text" id="txtreferencia" class="form-control" placeholder="Cod. Referencia">
      <div class="input-group-append">
        <button class="btn btn-outline-primary help" data-help="codreferencia" type="button"> <i class="fas fa-search"></i> </button>
      </div>
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
        <th class="text-center">Perfil</th>
        <th class="text-center">Unidad</th>
        <th class="text-center">Actividad</th>
        <th class="text-center">Sede</th>
        <th class="text-center">Cod Referencia</th>
        <th class="text-center"></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
    <tfoot>
      <tr>
        <th class="text-center" style="padding-right:30px">Perfil</th>
        <th class="text-center" style="padding-right:30px">Unidad</th>
        <th class="text-center" style="padding-right:30px">Actividad</th>
        <th class="text-center" style="padding-right:30px">Sede</th>
        <th class="text-center" style="padding-right:30px">Cod Referencia</th>
        <th class="text-center"></th>
      </tr>
    </tfoot>
  </table>
  </div>
</div>

<!-- Modal -->
<input type="hidden" id="typehelp">
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ayuda</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="row text-start">
        <div class="col-md-12 form-group element-animate pointer">
        <table id="dataTableHelp" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
          <thead>
            <tr>
              <th class="text-center" style="width: 50px; max-width: 50px">Selecc.</th>
              <th class="text-left">Código</th>
              <th class="text-left">Descripción</th>
            </tr>
          </thead>
          <tbody id="tbodyhelp">
            
          </tbody>
          <tfoot>
            <tr>
              <th class="text-center" style="padding-right:30px;width: 50px; max-width: 50px">Seleccionar</th>
              <th class="text-left" style="padding-right:30px">Código</th>
              <th class="text-left" style="padding-right:30px">Descripción</th>
          </tfoot>
        </table>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->

@endsection