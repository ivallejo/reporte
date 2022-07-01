@extends('layouts.app')

@section('content')

<script type="text/javascript" src="{{ asset('js/reporte.js') }}"></script>

<div class="row">
  <div class="row py-lg-5">
    <div class="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light">Carga de Maestros</h1>
      <p class="lead text-muted">En esta seccion ud. podra cargar las tablas maestras.</p>
      <p>
        <div class="mb-3">
          <div class="col-md-12 form-group element-animate pointer" id="divFile">
            <input name="file" id="file" multiple="multiple">
          </div>
        </div>
        <div class="mb-3"><button id="upload" class="btn btn-primary btn-primary-app"><i class="fas fa-cloud-upload-alt"></i> Subir</button></div>
      </p>
    </div>
  </div>
</div>

<div id="divupdate" class="row " style="font-size: 12px;display: none">
  <div class="table-responsive">
    <table id="dataTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
      <thead>
        <tr>
          <th style="width:200px" class="text-center">Ledger</th>
          <th class="text-center">Presupuesto</th>
          <th class="text-center">Periodo Presupuestal</th>
          <th class="text-center">Nivel 0 Cod</th>
          <th class="text-center">Nivel 1 COD</th>
          <th class="text-center">Nivel 1 DESC</th>
          <th class="text-center">Nivel 2 COD</th>
          <th class="text-center">Nivel 2 DESC</th>
          <th class="text-center">Nivel 4 COD</th>
          <th class="text-center">Nivel 4 DESC</th>
          <th class="text-center">Mes Contable ID MES</th>
          <th class="text-center">Mes Contable mesN</th>
          <th class="text-center">Fecha Contable</th>
          <th class="text-center">Año Fiscal</th>
          <th class="text-center">Moneda</th>
          <th class="text-center">Unidad COD</th>
          <th class="text-center">Unidad DESC</th>
          <th class="text-center">Actividad COD</th>
          <th class="text-center">Actividad DESC</th>
          <th class="text-center">Sede COD</th>
          <th class="text-center">Sede DESC</th>
          <th class="text-center">Referencia COD</th>
          <th class="text-center">Referencia DESC</th>
          <th class="text-center">Linea COD</th>
          <th class="text-center">Linea DESC</th>
          <th class="text-center">Unidad Negocio PC COD</th>
          <th class="text-center">Unidad Negocio PC DESC</th>
          <th class="text-center">Proyecto COD</th>
          <th class="text-center">Proyecto DESC</th>
          <th class="text-center">Actividad Proyecto COD</th>
          <th class="text-center">Actividad Proyecto DESC</th>
          <th class="text-center">Cd Fondo COD</th>
          <th class="text-center">Cd Fondo DESC</th>
          <th class="text-center">Cuenta COD</th>
          <th class="text-center">Cuenta DESC</th>
          <th class="text-center">Glosa</th>
          <th class="text-center">Desc Origen Doc</th>
          <th class="text-center">Desc Nro Doc</th>
          <th class="text-center">Desc Tipo Doc</th>
          <th class="text-center">Registrador</th>
          <th class="text-center">CliPro Codigo</th>
          <th class="text-center">CliPro Nombre</th>
          <th class="text-center">CliPro Tipo Doc</th>
          <th class="text-center">CliPro Númer Doc</th>
          <th class="text-center">Fecha Factura</th>
          <th class="text-center">Documento Relacionado</th>
          <th class="text-center">Moneda Origen</th>
          <th class="text-center">Fecha Pago</th>
          <th class="text-center">Igv Tipo Uso</th>
          <th class="text-center">Importe 2</th>
          <th class="text-center">Importe Dolares 2</th>
          <th class="text-center">Cod. Categoria</th>
          <th class="text-center">Direccion</th>
          <th class="text-center">Area</th>
          <th class="text-center">Tipo Actividad</th>
          <th class="text-center">Criterio</th>
          <th class="text-center">Flujo</th>
          <th class="text-center">Importe S</th>
          <th class="text-center">Importe USD</th>
          <th class="text-center">Categoria</th>
        </tr>
      </thead>
      <tbody id="tbody">
      </tbody>
      <tfoot>
        <tr>
          <th class="text-center">Ledger</th>
          <th class="text-center">Presupuesto</th>
          <th class="text-center">Periodo Presupuestal</th>
          <th class="text-center">Nivel 0 Cod</th>
          <th class="text-center">Nivel 1 COD</th>
          <th class="text-center">Nivel 1 DESC</th>
          <th class="text-center">Nivel 2 COD</th>
          <th class="text-center">Nivel 2 DESC</th>
          <th class="text-center">Nivel 4 COD</th>
          <th class="text-center">Nivel 4 DESC</th>
          <th class="text-center">Mes Contable ID MES</th>
          <th class="text-center">Mes Contable mesN</th>
          <th class="text-center">Fecha Contable</th>
          <th class="text-center">Año Fiscal</th>
          <th class="text-center">Moneda</th>
          <th class="text-center">Unidad COD</th>
          <th class="text-center">Unidad DESC</th>
          <th class="text-center">Actividad COD</th>
          <th class="text-center">Actividad DESC</th>
          <th class="text-center">Sede COD</th>
          <th class="text-center">Sede DESC</th>
          <th class="text-center">Referencia COD</th>
          <th class="text-center">Referencia DESC</th>
          <th class="text-center">Linea COD</th>
          <th class="text-center">Linea DESC</th>
          <th class="text-center">Unidad Negocio PC COD</th>
          <th class="text-center">Unidad Negocio PC DESC</th>
          <th class="text-center">Proyecto COD</th>
          <th class="text-center">Proyecto DESC</th>
          <th class="text-center">Actividad Proyecto COD</th>
          <th class="text-center">Actividad Proyecto DESC</th>
          <th class="text-center">Cd Fondo COD</th>
          <th class="text-center">Cd Fondo DESC</th>
          <th class="text-center">Cuenta COD</th>
          <th class="text-center">Cuenta DESC</th>
          <th class="text-center">Glosa</th>
          <th class="text-center">Desc Origen Doc</th>
          <th class="text-center">Desc Nro Doc</th>
          <th class="text-center">Desc Tipo Doc</th>
          <th class="text-center">Registrador</th>
          <th class="text-center">CliPro Codigo</th>
          <th class="text-center">CliPro Nombre</th>
          <th class="text-center">CliPro Tipo Doc</th>
          <th class="text-center">CliPro Númer Doc</th>
          <th class="text-center">Fecha Factura</th>
          <th class="text-center">Documento Relacionado</th>
          <th class="text-center">Moneda Origen</th>
          <th class="text-center">Fecha Pago</th>
          <th class="text-center">Igv Tipo Uso</th>
          <th class="text-center">Importe 2</th>
          <th class="text-center">Importe Dolares 2</th>
          <th class="text-center">Cod. Categoria</th>
          <th class="text-center">Direccion</th>
          <th class="text-center">Area</th>
          <th class="text-center">Tipo Actividad</th>
          <th class="text-center">Criterio</th>
          <th class="text-center">Flujo</th>
          <th class="text-center">Importe S</th>
          <th class="text-center">Importe USD</th>
          <th class="text-center">Categoria</th>
        </tr>
      </tfoot>
    </table>
  </div>
    <div class="mb-3">
        <button id="add" class="btn btn-primary btn-primary-app">
          <i class="fas fa-cloud-upload-alt"></i> Corregir
        </button>
        <button id="omitir" class="btn btn-warning btn-warning-app mx-2">
            <i class="fas fa-arrow-right"></i> Omitir
          </button>
    </div>
</div>

<!-- Modal -->
<input type="hidden" id="typehelp">
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <input type="hidden" id="hddLabel">
        <input type="hidden" id="hddValue">
        <input type="hidden" id="hddColumn">
        <input type="hidden" id="hddRow">
        <h4 class="modal-title" style="font-weight: bold;" id="exampleModalTitle">Edición</h5>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="$('#exampleModal').modal('hide');">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <label class="coment-text" id="exampleModalLabel"></label>
            <br>
          <div class="form-group">
            <label for="txtValue" id="lblValue" class="col-form-label"></label>
            <input type="text" id="txtValue" class="form-control" placeholder="">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="$('#exampleModal').modal('hide');">Close</button>
        <button type="button" class="btn btn-success aprobar-modal btn-aprobar" onclick="updateRow()">Actualizar</button>
      </div>
    </div>
  </div>
</div
<!-- Modal -->

@endsection
