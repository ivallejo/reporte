
var arrData = [];
$(async function() {
      // $('.selectpicker').selectpicker();
     data = await getDataEjecucion(`2021¦1,2,3,4,5,6`);
     showData(data)
     createExcelExportXLXS();
     btnSearch();
});



function getDataEjecucion(trama) {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/direcciones/data',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel,
                        trama
                  },
                  success: function(resp) {
                        resolve(resp);
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                          reject(XMLHttpRequest.responseText)
                  }
            });
      });
}

function showData(data) {
      
      $("#tbody").empty()

      let text = '';
      let arryCommon = [];
      let col1 = 0;
      let col2 = 0;
      let col3 = 0;
      let col4 = 0;
      let col5 = 0;
      let col6 = 0;
      let col7 = 0;
      let col8 = 0;
      let col9 = 0;
      let col10 = 0;

      arrData = []

      $.each(data.data_ppto_ingresos, function (i, item) {
            
                  // PRESUPUESTO_ANUAL_2021 <=============
                  // INGRESOS  <=====
                  // arryCommon = [];
                  // arryCommon = data.data_ppto_ingresos.filter( x => x.Direccion == item.Direccion && x.Area == item.Area)
                  // if( arryCommon.length > 0) col1 = (arryCommon[0].Total*1)
                  // else col1 = 0
                  col1 = (item.Total*1)
                  // EGRESOS  <=====
                  arryCommon = [];
                  arryCommon = data.data_ppto_egresos.filter( x => x.Direccion == item.Direccion && x.Area == item.Area)
                  if( arryCommon.length > 0) col2 = (arryCommon[0].Total*1)
                  else col2 = 0
                  
                  // EJECUTADO_ENE-JUN <=============
                  // INGRESOS  <=====
                  arryCommon = [];
                  arryCommon = data.data_ejec_ingresos.filter( x => x.Direccion == item.Direccion && x.Area == item.Area)
                  if( arryCommon.length > 0) col3 = (arryCommon[0].Total*1)
                  else col3 = 0
                  // EGRESOS  <=====
                  arryCommon = [];
                  arryCommon = data.data_ejec_egresos.filter( x => x.Direccion == item.Direccion && x.Area == item.Area)
                  if( arryCommon.length > 0) col4 = (arryCommon[0].Total*1)
                  else col4 = 0

                  // COMPROMISOS <=============
                  // INGRESOS  <=====
                  col5 = 0
                  // EGRESOS  <=====
                  arryCommon = [];
                  arryCommon = data.data_com_egresos.filter( x => x.Direccion == item.Direccion && x.Area == item.Area)
                  if( arryCommon.length > 0) col6 = (arryCommon[0].Total*1)
                  else col6 = 0

                  // SALDO_2021 <=============
                  // INGRESOS  <=====
                  col7 = (+col1 - col3 - col5)
                  col7 = isNaN(col7) ? 0 : isFinite(col7) ? (col7) : 0;
                  // EGRESOS  <=====
                  col8 = (+col2 - col4 - col6)
                  col8 = isNaN(col8) ? 0 : isFinite(col8) ? (col8) : 0;
                  
                  // SALDO_2021 <=============
                  // INGRESOS  <=====
                  col9 = ((+col3 + col5)/ col1)
                  col9 = isNaN(col9) ? 0 : isFinite(col9) ? (col9*100) : 0;
                  // EGRESOS  <=====
                  col10 = ((+col4 + col6)/ col2)
                  col10 = isNaN(col10) ? 0 : isFinite(col10) ? (col10*100) : 0;

                  // TABLA
                  text += `<tr>\
                              <td class="text-center" style="padding-right:30px"> ${ item.Direccion } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ item.Area } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col1.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col2.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col3.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col4.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col5.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col6.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col7.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col8.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col9.toFixed() }% </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col10.toFixed() }% </td>\
                        </tr>`;

                  // ARR EXCEL
                  arrData.push({
                        Direccion : item.Direccion,
                        Area : item.Area,
                        col1 : col1,
                        col2 : col2,
                        col3 : col3,
                        col4 : col4,
                        col5 : col5,
                        col6 : col6,
                        col7 : col7,
                        col8 : col8,
                        col9 : col9,
                        col10 : col10
                  })
            
      });

      $('#dataTable').DataTable().clear();
      $('#dataTable').DataTable().destroy();
      $("#tbody").append(text)
      tableData = $('#dataTable').DataTable({
            // order : [[0, 'desc']],
            language : {                    
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }                
            },
            "drawCallback": function( settings ) {
                  // configActionTable()
            }
      })
}




function createExcelExportXLXS() {
// arrData
      btnDownload.onclick = function () {
            var selectedDesde = $('#mesDesde').find('option:selected');
            var selectedHasta = $('#mesHasta').find('option:selected');
            let mesDesdeTexto = selectedDesde.text().substr(0,3)
            let mesHastaTexto = selectedHasta.text().substr(0,3)

            let cabeceras0 = `DIRECCIÓN / UNIDAD¦PRESUPUESTO ANUAL 2021¦EJECUTADO ${mesDesdeTexto}-${mesHastaTexto}*¦COMPROMISOS*¦SALDO 2021¦AVANCE 2021 (%)`.split("¦");
            
            let cabeceras = "INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS".split("¦");
            let cells = []    
            let dataArray = []
            let index = 0;
            
            
            dataArray.push(addRowExcelnHeader(12))
            dataArray.push(addRowExcelnHeader(12, 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', 3, 11))
            // dataArray.push(addRowExcelnHeader(12, 'Al cierre de Junio preliminar 2021 / En S/. 000', 3, 9))
            dataArray.push(addRowExcelnHeader(12, '', 3, 9))

            // cells = [] 
            // cells.push({ value: 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', colSpan: 3, fontSize: 11, bold: true, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            // dataArray.push({ cells: cells })
            
            // cells = [] 
            // cells.push({ value: 'Al cierre de Junio preliminar 2021 / En S/. 000', colSpan: 3, fontSize: 9, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            // dataArray.push({ cells: cells })

            cells = []
            for (let index = 0; index < 12; index++) {
                  cells.push({ value: '',borderBottom: { color: "#000", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            }
            dataArray.push({ cells: cells })

            cells = []  
            cabeceras0.forEach((row) => {
                  cells.push(
                        {
                              value: row,
                              colSpan: 2,
                              rowSpan: ( index == 0 ) ? 2 : 1,
                              width: ( index <= 3 ) ? 300 : 100,
                              background: "#1f4e78", 
                              textAlign: "center",
                              verticalAlign: "center",
                              color: "#ffffff", //(index <= 2 ) ? "#ffffff" : "#000000", 
                              fontSize: 10,
                              bold: true,
                              height: 180,
                              borderBottom:  { color: "#000", size: 1 },
                              borderLeft: { color: "#1f4e78", size: 1 },
                              borderTop: { color: "#000", size: 1 },
                              borderRight: { color: "#1f4e78", size: 1 }
                        })
                  index++;
            })
            dataArray.push({ cells: cells })

            cells = []  
            cabeceras.forEach((row) => {
                  cells.push(
                        { 
                              value: row, 
                              width: (index <= 3 ) ? 280 : 150,
                              background: (index >= 3 ) ? "#1f4e78" : "#ffffff", 
                              textAlign: "center", 
                              color: "#ffffff", //(index <= 2 ) ? "#ffffff" : "#000000", 
                              fontSize: 10, 
                              bold: true, 
                              height: 180, 
                              borderBottom:  { color: (index >= 3 ) ?"#000000" : "#fff", size: 1 } , 
                              borderLeft: { color: (index >= 3 ) ?"#000000" : "#fff", size: 1 }, 
                              borderTop: { color: (index >= 3 ) ?"#000000" : "#fff", size: 1 }, 
                              borderRight: { color: (index >= 3 ) ?"#000000" : "#fff", size: 1 }
                        })
                  index++;
            })
            dataArray.push({ cells: cells })
            
            // dataArray.push(addRowExcelnHeader(12))
            
            let direccion = ''
            let unidad = ''

            let total_col1 = 0;
            let total_col2 = 0;
            let total_col3 = 0;
            let total_col4 = 0;
            let total_col5 = 0;
            let total_col6 = 0;
            let total_col7 = 0;
            let total_col8 = 0;
            let total_col9 = 0;
            let total_col10 = 0;
            cells = [] 
            $.each(arrData, function (i, item) {

                  if ( direccion.trim() != item.Direccion.trim() ) {
                        direccion = item.Direccion

                        total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col1 : 0 ) ; }, 0)
                        total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col2 : 0 ) ; }, 0)
                        total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col3 : 0 ) ; }, 0)
                        total_col4 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col4 : 0 ) ; }, 0)
                        total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col5 : 0 ) ; }, 0)
                        total_col6 = arrData.reduce(function (acc, obj) { return acc + (obj.Direccion == item.Direccion ? obj.col6 : 0 ) ; }, 0)

                        // TOTAL SALDO_2021 <=============
                        // INGRESOS  <=====
                        total_col7 = (+total_col1 - total_col3 - total_col5)
                        total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
                        // EGRESOS  <=====
                        total_col8 = (+total_col2 - total_col4 - total_col6)
                        total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
                        
                        // TOTAL SALDO_2021 <=============
                        // INGRESOS  <=====
                        total_col9 = ((+total_col3 + total_col5)/ total_col1)
                        total_col9 = isNaN(total_col9) ? 0 : isFinite(total_col9) ? (total_col9) : 0;
                        // EGRESOS  <=====
                        total_col10 = ((+total_col4 + total_col6)/ total_col2)
                        total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) : 0;

                        dataArray.push(addRowExcelnHeader(12))

                        cells = []
                        cells.push({ value: item.Direccion, colSpan: 2, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col5, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col9, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col10, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })

                        cells = []
                        cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Area, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col9) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col10) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })

                  } else {

                        cells = []
                        cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Area, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col9) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col10) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })
                  }
            })

            dataArray.push(addRowExcelnHeader(12))

            total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.col1) ; }, 0)
            total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.col2) ; }, 0)
            total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.col3) ; }, 0)
            total_col4 = arrData.reduce(function (acc, obj) { return acc + (obj.col4) ; }, 0)
            total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.col5) ; }, 0)
            total_col6 = arrData.reduce(function (acc, obj) { return acc + (obj.col6) ; }, 0)
            // TOTAL SALDO_2021 <=============
            // INGRESOS  <=====
            total_col7 = (+total_col1 - total_col3 - total_col5)
            total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
            // EGRESOS  <=====
            total_col8 = (+total_col2 - total_col4 - total_col6)
            total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
            
            // TOTAL SALDO_2021 <=============
            // INGRESOS  <=====
            total_col9 = ((+total_col3 + total_col5)/ total_col1)
            total_col9 = isNaN(total_col9) ? 0 : isFinite(total_col9) ? (total_col9) : 0;
            // EGRESOS  <=====
            total_col10 = ((+total_col4 + total_col6)/ total_col2)
            total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) : 0;

            cells = []
            cells.push({ value: 'Total general', colSpan: 2, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col5, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col9, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col10, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells })

            var testImage= "http://localhost:8000/cetrumpucp.png"
            

            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                        drawings: [{
                              topLeftCell: "E3",
                              offsetX: 30,
                              offsetY: 10,
                              width: 450,
                              height: 330,
                              image: testImage
                          }],
                          columns: [
                              { width: 50 },
                              { width: 160 },
                              { width: 160 },  
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 150 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                          ],
                          title: "Ejecucion",
                          rows: dataArray
                      }
                  ]
              });
              kendo.saveAs({
                  dataURI: workbook.toDataURL(),
                  fileName: "Ejecucion.xlsx"
              });
      }

}

function entre1000(value) {
      return (value/1000)
}

function entre1000tofixed2(value) {
      return (value/1000).toFixed()
}

function sumaTransferenciaInterna(Cat_DESC, col){
      // debugger
      let total = 0;
      let arrDataTransferencia = arrData.filter(function (el) {
            return el.Cat_DESC == Cat_DESC;
      });
      // let total = 0;
      arrDataTransferencia.forEach((entry) => {
            
            // try {
                  if( entry.Subcat_CONCEPTO.includes('INGRESOS') ) {
                        total += entry[col];
                  } 
                  else {
                        total -= entry[col];
                  } 
            // } catch (error) {
            //       debugger   
            // }
      });
      return total;
}

function sumaTransferenciaInternaRG(col, tipo){
      let total = 0;
      let arrDataTransferencia = arrData.filter(function (el) {
            return el.Cat_DESC == 'TRANSFERENCIA INTERNA' && el.Subcat_CONCEPTO.includes(tipo);
      });
      arrDataTransferencia.forEach((entry) => {
            total += entry[col];
      });
      return total;
}

function compare( a, b ) {
      if ( a.order_reporte < b.order_reporte ){
        return -1;
      }
      if ( a.order_reporte > b.order_reporte ){
        return 1;
      }
      return 0;
    }

function compareAgrupador( a, b ) {
if ( a.agrupador2 > b.agrupador2 ){
      return -1;
}
if ( a.agrupador2 < b.agrupador2 ){
      return 1;
}
return 0;
}

function formatImport( value ) {
      if(value == undefined) {
            return 0
      } else {
            return (value.toFixed() * 1)//.toLocaleString('en') 
      }
}

function addRowExcel(cabeceras){
      let cells = []    
      cabeceras.forEach((row) => {
            cells.push({ value: '',borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
      })
      return { cells }
}

function addRowExcelnHeader(nHeader, value = '', colSpan = 1, fontSize = 10){
      let cells = []
      for (let index = 0; index < nHeader; index++) {
            cells.push({ value, colSpan, fontSize, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            value = ''
            colSpan = 1            
      }
      return { cells }
}


function btnSearch() {

      $('.btnsearch').click( async function() {
            
            var selectedDesde = $('#mesDesde').find('option:selected');
            var selectedHasta = $('#mesHasta').find('option:selected');

            let mesDesdeId = selectedDesde.val() * 1
            let mesDesdeTexto = selectedDesde.text().substr(0,3)

            let mesHastaId = selectedHasta.val() * 1
            let mesHastaTexto = selectedHasta.text().substr(0,3)

            var selected = [];
      
            for (let index = mesDesdeId; index <= mesHastaId; index++) {
                  selected.push( index );
            }

            hejecutadoingresosmeses.innerHTML = `EJECUTADO_${mesDesdeTexto}-${mesHastaTexto}  INGRESOS`
            hejecutadoegresosmeses.innerHTML = `EJECUTADO_${mesDesdeTexto}-${mesHastaTexto} EGRESOS`
            
            fejecutadoingresosmeses.innerHTML = `EJECUTADO_${mesDesdeTexto}-${mesHastaTexto}  INGRESOS`
            fejecutadoegresosmeses.innerHTML = `EJECUTADO_${mesDesdeTexto}-${mesHastaTexto} EGRESOS`
            
            // $(options).each(function(){
            //       selected.push( $(this).val() );
            // });
            console.log(selected.join(','))
            data = await getDataEjecucion(`${ano.value}¦${selected.join(',')}`);
            showData(data)
      })
}
