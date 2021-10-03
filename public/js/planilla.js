
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
                  url: '/planilla/data',
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
      arrData = []

      $.each(data.data_ejec_2021_ej, function (i, item) {
            // if ( item.Cat_DESC.trim() == "REMUNERACIONES FIJAS" ) {
                  // EJEC <=============
                  // 2020  <=====
                  arryCommon = [];
                  arryCommon = data.data_ejec_2020.filter( x => x.Subcat_CONCEPTO == item.Subcat_CONCEPTO && x.Subcat_DESC == item.Subcat_DESC)
                  if( arryCommon.length > 0) col1 = (arryCommon[0].Total*1)
                  else col1 = 0

                  // col1 = (item.Total*1)
                  // 2020 - 1/6  <=====
                  arryCommon = [];
                  arryCommon = data.data_ejec_2020_ej.filter( x => x.Subcat_CONCEPTO == item.Subcat_CONCEPTO && x.Subcat_DESC == item.Subcat_DESC)
                  if( arryCommon.length > 0) col3 = (arryCommon[0].Total*1)
                  else col3 = 0  
                  // 2021
                  col5 = (item.Total*1)
                  // arryCommon = [];
                  // arryCommon = data.data_ejec_2021_ej.filter( x => x.Subcat_CONCEPTO == item.Subcat_CONCEPTO && x.Subcat_DESC == item.Subcat_DESC)
                  // if( arryCommon.length > 0) col5 = (arryCommon[0].Total*1)
                  // else col5 = 0  

                  // PPTO <=============
                  //2021 1/12  <=====
                  // col2 = (item.Total*1)
                  arryCommon = [];
                  arryCommon = data.data_ppto_2021.filter( x => x.Subcat_CONCEPTO == item.Subcat_CONCEPTO && x.Subcat_DESC == item.Subcat_DESC)
                  if( arryCommon.length > 0) col2 = (arryCommon[0].Total*1)
                  else col2 = 0

                  // AVANCE <=============
                  // 2020  <=====
                  col4 = (col3/col1)
                  col4 = isNaN(col4) ? 0 : isFinite(col4) ? (col4*100) : 0;
                  // 2021  <=====
                  col6 = (col5/col2)
                  col6 = isNaN(col6) ? 0 : isFinite(col6) ? (col6*100) : 0;

                  // VAR ENE-JUN 2020-2021
                  // MONTO
                  col7 = (col5-col3)
                  col7 = isNaN(col7) ? 0 : (col7*1)
                  // PORCENTAJE
                  col8 = (col5/col3)
                  col8 = isNaN(col8) ? 0 : isFinite(col8) ? ((col8-1)*100) : 0;
                  
                  // TABLA
                  text += `<tr>\
                              <td class="text-center" style="padding-right:30px"> ${ item.Cat_DESC } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ item.Subcat_CONCEPTO } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ item.Subcat_DESC } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col1.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col2.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col3.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col4.toFixed() }% </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col5.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col6.toFixed() }% </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col7.toFixed() } </td>\
                              <td class="text-center" style="padding-right:30px"> ${ col8.toFixed() }% </td>\
                        </tr>`;

                  // ARR EXCEL
                  arrData.push({
                        Cat_DESC : item.Cat_DESC,
                        Campo1 : item.Campo1,
                        Campo2 : item.Campo2,
                        Subcat_CONCEPTO : item.Subcat_CONCEPTO,
                        Subcat_DESC : item.Subcat_DESC,
                        col1 : col1,
                        col2 : col2,
                        col3 : col3,
                        col4 : col4,
                        col5 : col5,
                        col6 : col6,
                        col7 : col7,
                        col8 : col8
                  })
            // }
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
            
            let cabeceras = `¦¦¦ENEDIC EJEC2020¦ENEDIC PPTO2021¦${hejec2020meses.innerHTML}¦AVANCE 2020¦${hejec2021meses.innerHTML}¦AVANCE EJEC 2021¦${hvar2021montomeses.innerHTML}¦${hvar2021pocentajemeses.innerHTML}`.split("¦");
            let cells = []    
            let dataArray = []
            let index = 0;
            
            dataArray.push(addRowExcelnHeader(12))
            dataArray.push(addRowExcelnHeader(12, 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', 2, 11))
            // dataArray.push(addRowExcelnHeader(12, 'Al cierre de Junio preliminar 2021 / En S/. 000', 2, 9))
            dataArray.push(addRowExcelnHeader(12, '', 2, 9))

            // cells = [] 
            // cells.push({ value: 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', colSpan: 2, fontSize: 11, bold: true, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            // dataArray.push({ cells: cells })
            
            // cells = [] 
            // cells.push({ value: 'Al cierre de Junio preliminar 2021 / En S/. 000', colSpan: 2, fontSize: 9, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            // dataArray.push({ cells: cells })
            // dataArray.push(addRowExcelnHeader(12))

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
                
            let Subcat_CONCEPTO = ''

            let total_col1 = 0;
            let total_col2 = 0;
            let total_col3 = 0;
            let total_col4 = 0;
            let total_col5 = 0;
            let total_col6 = 0;
            let total_col7 = 0;
            let total_col8 = 0;
            
            // arrData.sort( compareAgrupador );
            // arrData.sort( compare );
            let arrTotales = []
            let nextCuadro = false
            $.each(arrData , function (i, item) {
                  if (nextCuadro) return
                  if ( item.Cat_DESC.trim() == "REMUNERACIONES FIJAS" ) {
                        cells = [] 
                        if ( Subcat_CONCEPTO != item.Subcat_CONCEPTO ) {
                              if ( i!= 0) {
                                    total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
                                    total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
                                    total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
                                    
                                    total_col4 = total_col3 / total_col1
                                    total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)
            
                                    total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)
            
                                    total_col6 = total_col5 / total_col2
                                    total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)
            
                                    total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)
            
                                    // PORCENTAJE
                                    total_col8 = (total_col5/total_col3)
                                    total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
                                    
                                    // Totales
                                    arrTotales.push({
                                          col1 : total_col1,
                                          col2 : total_col2,
                                          col3 : total_col3,
                                          col4 : total_col4,
                                          col5 : total_col5,
                                          col6 : total_col6,
                                          col7 : total_col7,
                                          col8 : total_col8
                                    })
            
            
                                    cells = []
                                    cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    dataArray.push({ cells: cells })
                                    dataArray.push(addRowExcel(cabeceras))
                                    
                              } else {
                                    dataArray.push(addRowExcel(cabeceras))
                                    // 
                                    cells = []
                                    cells.push({ value: 'REMUNERACIONES FIJAS' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    dataArray.push({ cells: cells })
                                    // 
                                    dataArray.push(addRowExcel(cabeceras))
                              }
                              
                              
                              Subcat_CONCEPTO = item.Subcat_CONCEPTO
                              
                              if ( item.Cat_DESC.trim() == 'PRACTICANTES') return;
      
                              cells = []
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        } else {
      
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        }
                  } else {
                        nextCuadro = true
                        total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
                        total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
                        total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
                        
                        total_col4 = total_col3 / total_col1
                        total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)

                        total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)

                        total_col6 = total_col5 / total_col2
                        total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)

                        total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)

                        // PORCENTAJE
                        total_col8 = (total_col5/total_col3)
                        total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
                        
                        // Totales
                        arrTotales.push({
                              col1 : total_col1,
                              col2 : total_col2,
                              col3 : total_col3,
                              col4 : total_col4,
                              col5 : total_col5,
                              col6 : total_col6,
                              col7 : total_col7,
                              col8 : total_col8
                        })


                        cells = []
                        cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells: cells })
                        dataArray.push(addRowExcel(cabeceras))
                  }
            })

            let share_porcentaje_planilla_perdoc = 0
            let share_porcentaje_planilla_pernnodoc = 0

            // REMUNERACION FIJAS 
            let totalrem_col1 = arrTotales[0].col1 + arrTotales[1].col1
            let totalrem_col2 = arrTotales[0].col2 + arrTotales[1].col2
            let totalrem_col3 = arrTotales[0].col3 + arrTotales[1].col3
            let totalrem_col4 = totalrem_col3 / totalrem_col1
            totalrem_col4 = isNaN(totalrem_col4) ? 0 : (totalrem_col4)
            let totalrem_col5 = arrTotales[0].col5 + arrTotales[1].col5
            let totalrem_col6 = totalrem_col5 / totalrem_col2
            totalrem_col6 = isNaN(totalrem_col6) ? 0 : (totalrem_col6)
            let totalrem_col7 = totalrem_col5 - totalrem_col3
            let totalrem_col8 = totalrem_col5 / totalrem_col3
            totalrem_col8 = isNaN(totalrem_col8) ? 0 : isFinite(totalrem_col8) ? ((totalrem_col8-1)) : 0;
            dataArray[5].cells[3].value = totalrem_col1
            dataArray[5].cells[4].value = totalrem_col2
            dataArray[5].cells[5].value = totalrem_col3
            dataArray[5].cells[6].value = totalrem_col4
            dataArray[5].cells[7].value = totalrem_col5
            dataArray[5].cells[8].value = totalrem_col6
            dataArray[5].cells[9].value = totalrem_col7
            dataArray[5].cells[10].value = totalrem_col8
            dataArray.push(addRowExcel(cabeceras))

            share_porcentaje_planilla_perdoc = arrTotales[0].col5 / totalrem_col5
            share_porcentaje_planilla_pernnodoc = arrTotales[1].col5 / totalrem_col5

            // REMUNERACION FIJAS 

            // TOTAL 1ER CUADRO
            let total_1_avance = totalrem_col5 / totalrem_col2
            total_1_avance = isNaN(total_1_avance) ? 0 : isFinite(total_1_avance) ? total_1_avance : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrem_col2, type:"number", format: "#,##0", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_1_avance, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'Avance', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            // TOTAL 1ER CUADRO

            dataArray.push(addRowExcel(cabeceras))
          
            // 2DO CUADRO

            index = 0;
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
            
            index = -1;
            Subcat_CONCEPTO = ''
            total_col1 = 0;
            total_col2 = 0;
            total_col3 = 0;
            total_col4 = 0;
            total_col5 = 0;
            total_col6 = 0;
            total_col7 = 0;
            total_col8 = 0;
            arrTotales = []
            nextCuadro = false
            $.each(arrData , function (i, item) {
                  if (nextCuadro) return
                  if ( item.Cat_DESC.trim() == "SOPORTE EN SEDES" ) {
                        index++
                        cells = [] 
                        if ( Subcat_CONCEPTO != item.Subcat_CONCEPTO ) {
                              if ( index!= 0) {
                                    total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
                                    total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
                                    total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
                                    
                                    total_col4 = total_col3 / total_col1
                                    total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)
            
                                    total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)
            
                                    total_col6 = total_col5 / total_col2
                                    total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)
            
                                    total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)
            
                                    // PORCENTAJE
                                    total_col8 = (total_col5/total_col3)
                                    total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
                                    
                                    // Totales
                                    arrTotales.push({
                                          col1 : total_col1,
                                          col2 : total_col2,
                                          col3 : total_col3,
                                          col4 : total_col4,
                                          col5 : total_col5,
                                          col6 : total_col6,
                                          col7 : total_col7,
                                          col8 : total_col8
                                    })
            
            
                                    cells = []
                                    cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    dataArray.push({ cells: cells })
                                    dataArray.push(addRowExcel(cabeceras))
                                    
                              } else {
                                    dataArray.push(addRowExcel(cabeceras))
                                    // 
                                    cells = []
                                    cells.push({ value: 'SOPORTE EN SEDES' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    dataArray.push({ cells: cells })
                                    // 
                                    dataArray.push(addRowExcel(cabeceras))
                              }
                              
                              
                              Subcat_CONCEPTO = item.Subcat_CONCEPTO
                              
                              if ( item.Cat_DESC.trim() == 'PRACTICANTES') return;
      
                              cells = []
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        } else {
      
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        }
                  } else {
                        if ( item.Cat_DESC.trim() != "REMUNERACIONES FIJAS" ) {
                              nextCuadro = true
                              total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
                              total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
                              total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
                              
                              total_col4 = total_col3 / total_col1
                              total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)
      
                              total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)
      
                              total_col6 = total_col5 / total_col2
                              total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)
      
                              total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)
      
                              // PORCENTAJE
                              total_col8 = (total_col5/total_col3)
                              total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
                              
                              // Totales
                              arrTotales.push({
                                    col1 : total_col1,
                                    col2 : total_col2,
                                    col3 : total_col3,
                                    col4 : total_col4,
                                    col5 : total_col5,
                                    col6 : total_col6,
                                    col7 : total_col7,
                                    col8 : total_col8
                              })
      
                              cells = []
                              cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                              dataArray.push(addRowExcel(cabeceras))
                        }
                  }
            })

            let indexSoporteEnSedes = 0
            $.each(dataArray , function (i, item) {
                  $.each(item.cells , function (j, jitem) {   
                        if(jitem.value == 'SOPORTE EN SEDES') {
                              indexSoporteEnSedes = i;
                        }
                  })
            })

            // SOPORTE NE SEDES
            totalrem_col1 = arrTotales[0].col1 + arrTotales[1].col1 + arrTotales[2].col1
            totalrem_col2 = arrTotales[0].col2 + arrTotales[1].col2 + arrTotales[2].col2
            totalrem_col3 = arrTotales[0].col3 + arrTotales[1].col3 + arrTotales[2].col3
            totalrem_col4 = totalrem_col3 / totalrem_col1
            totalrem_col4 = isNaN(totalrem_col4) ? 0 : (totalrem_col4)
            totalrem_col5 = arrTotales[0].col5 + arrTotales[1].col5 + arrTotales[2].col5
            totalrem_col6 = totalrem_col5 / totalrem_col2
            totalrem_col6 = isNaN(totalrem_col6) ? 0 : (totalrem_col6)
            totalrem_col7 = totalrem_col5 - totalrem_col3
            totalrem_col8 = totalrem_col5 / totalrem_col3
            totalrem_col8 = isNaN(totalrem_col8) ? 0 : isFinite(totalrem_col8) ? ((totalrem_col8-1)) : 0;
            dataArray[indexSoporteEnSedes].cells[3].value = totalrem_col1
            dataArray[indexSoporteEnSedes].cells[4].value = totalrem_col2
            dataArray[indexSoporteEnSedes].cells[5].value = totalrem_col3
            dataArray[indexSoporteEnSedes].cells[6].value = totalrem_col4
            dataArray[indexSoporteEnSedes].cells[7].value = totalrem_col5
            dataArray[indexSoporteEnSedes].cells[8].value = totalrem_col6
            dataArray[indexSoporteEnSedes].cells[9].value = totalrem_col7
            dataArray[indexSoporteEnSedes].cells[10].value = totalrem_col8
            dataArray.push(addRowExcel(cabeceras))
            // SOPORTENE SEDES

            // TOTAL 2DO CUADRO
            total_1_avance = totalrem_col5 / totalrem_col2
            total_1_avance = isNaN(total_1_avance) ? 0 : isFinite(total_1_avance) ? total_1_avance : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrem_col2, type:"number", format: "#,##0", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_1_avance, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'Avance', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            // TOTAL 2DO CUADRO
            
            // 2DO CUADRO

            dataArray.push(addRowExcel(cabeceras))
          
            // 3ER CUADRO
            index = 0;
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

            index = -1;
            Subcat_CONCEPTO = ''
            total_col1 = 0;
            total_col2 = 0;
            total_col3 = 0;
            total_col4 = 0;
            total_col5 = 0;
            total_col6 = 0;
            total_col7 = 0;
            total_col8 = 0;
            arrTotales = []
            nextCuadro = false
            $.each(arrData , function (i, item) {
                  if (nextCuadro) return
                  if ( item.Cat_DESC.trim() == "PRACTICANTES" ) {
                        index++
                        cells = [] 
                        if ( Subcat_CONCEPTO != item.Subcat_CONCEPTO ) {
                              if ( index!= 0) {
                              } else {
                                    dataArray.push(addRowExcel(cabeceras))
                                    // 
                                    cells = []
                                    cells.push({ value: 'PRACTICANTES' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                                    dataArray.push({ cells: cells })
                                    // 
                                    dataArray.push(addRowExcel(cabeceras))
                              }
                              
                              Subcat_CONCEPTO = item.Subcat_CONCEPTO
      
                              cells = []
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        } else {
      
                              cells.push({ value: item.Campo1, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Campo2, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(item.col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        }
                  } else {
                        if ( item.Cat_DESC.trim() != "REMUNERACIONES FIJAS" && item.Cat_DESC.trim() != "SOPORTE EN SEDES" ) {
                              nextCuadro = true
                              total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
                              total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
                              total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
                              
                              total_col4 = total_col3 / total_col1
                              total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)
      
                              total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)
      
                              total_col6 = total_col5 / total_col2
                              total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)
      
                              total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)
      
                              // PORCENTAJE
                              total_col8 = (total_col5/total_col3)
                              total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
                              
                              // Totales
                              arrTotales.push({
                                    col1 : total_col1,
                                    col2 : total_col2,
                                    col3 : total_col3,
                                    col4 : total_col4,
                                    col5 : total_col5,
                                    col6 : total_col6,
                                    col7 : total_col7,
                                    col8 : total_col8
                              })
      
                              cells = []
                              cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                              dataArray.push(addRowExcel(cabeceras))
                        }
                  }
            })


            total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col1 : 0 ) ; }, 0)
            total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col2 : 0 ) ; }, 0)
            total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col3 : 0 ) ; }, 0)
            
            total_col4 = total_col3 / total_col1
            total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)

            total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col5 : 0 ) ; }, 0)

            total_col6 = total_col5 / total_col2
            total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)

            total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Subcat_CONCEPTO == Subcat_CONCEPTO ? obj.col7 : 0 ) ; }, 0)

            // PORCENTAJE
            total_col8 = (total_col5/total_col3)
            total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? ((total_col8-1)*100) : 0;
            
            // Totales
            arrTotales.push({
                  col1 : total_col1,
                  col2 : total_col2,
                  col3 : total_col3,
                  col4 : total_col4,
                  col5 : total_col5,
                  col6 : total_col6,
                  col7 : total_col7,
                  col8 : total_col8
            })


            cells = []
            cells.push({ value: 'TOTAL ' + Subcat_CONCEPTO, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: (formatImport(total_col8) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            dataArray.push(addRowExcel(cabeceras))

            let indexPracticantes = 0
            $.each(dataArray , function (i, item) {
                  $.each(item.cells , function (j, jitem) {   
                        if(jitem.value == 'PRACTICANTES') {
                              indexPracticantes = i;
                        }
                  })
            })

            // PRACTICANTES
            totalrem_col1 = arrTotales[0].col1
            totalrem_col2 = arrTotales[0].col2
            totalrem_col3 = arrTotales[0].col3
            totalrem_col4 = totalrem_col3 / totalrem_col1
            totalrem_col4 = isNaN(totalrem_col4) ? 0 : (totalrem_col4)
            totalrem_col5 = arrTotales[0].col5
            totalrem_col6 = totalrem_col5 / totalrem_col2
            totalrem_col6 = isNaN(totalrem_col6) ? 0 : (totalrem_col6)
            totalrem_col7 = totalrem_col5 - totalrem_col3
            totalrem_col8 = totalrem_col5 / totalrem_col3
            totalrem_col8 = isNaN(totalrem_col8) ? 0 : isFinite(totalrem_col8) ? ((totalrem_col8-1)) : 0;
            dataArray[indexPracticantes].cells[3].value = totalrem_col1
            dataArray[indexPracticantes].cells[4].value = totalrem_col2
            dataArray[indexPracticantes].cells[5].value = totalrem_col3
            dataArray[indexPracticantes].cells[6].value = totalrem_col4
            dataArray[indexPracticantes].cells[7].value = totalrem_col5
            dataArray[indexPracticantes].cells[8].value = totalrem_col6
            dataArray[indexPracticantes].cells[9].value = totalrem_col7
            dataArray[indexPracticantes].cells[10].value = totalrem_col8
            dataArray.push(addRowExcel(cabeceras))
            // PRACTICANTES

            // TOTAL 3ER CUADRO
            total_1_avance = totalrem_col5 / totalrem_col2
            total_1_avance = isNaN(total_1_avance) ? 0 : isFinite(total_1_avance) ? total_1_avance : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrem_col2, type:"number", format: "#,##0", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_1_avance, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'Avance', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            // TOTAL 3ER CUADRO
            
            dataArray.push(addRowExcel(cabeceras))
            dataArray.push(addRowExcel(cabeceras))

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'EVOLUCIÓN HEAD COUNT:', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '% Variación', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'Share % HC', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'Share % Planilla', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            
            dataArray.push(addRowExcel(cabeceras))

            // let totalrem_col5 = arrTotales[0].col5 + arrTotales[1].col5

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'TOTAL PERSONAL', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'PERSONAL DOCENTE', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: share_porcentaje_planilla_perdoc, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            
            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'PERSONAL DOCENTE', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'PERSONAL NO DOCENTE', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: share_porcentaje_planilla_pernnodoc, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'PERSONAL NO DOCENTE', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#FFFFFF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 0, type:"number", format: "0%", fontSize: 10, background: "#FFFFFF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })
            // 3ER CUADRO

            

            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                          columns: [
                              { width: 160 },
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

// function addRowExcelnHeader(nHeader){
//       let cells = []
//       for (let index = 0; index < nHeader; index++) {
//             cells.push({ value: '',borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
//       }
//       return { cells }
// }

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

            hejec2020meses.innerHTML = `${mesDesdeTexto}-${mesHastaTexto} EJEC-2020`
            hejec2021meses.innerHTML = `${mesDesdeTexto}-${mesHastaTexto} EJEC-2021`
            hvar2021montomeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 Monto`
            hvar2021pocentajemeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 %`
            
            fejec2020meses.innerHTML = `${mesDesdeTexto}-${mesHastaTexto} EJEC-2020`
            fejec2021meses.innerHTML = `${mesDesdeTexto}-${mesHastaTexto} EJEC-2021`
            fvar2021montomeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 Monto`
            fvar2021pocentajemeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 %`

            console.log(selected.join(','))
            data = await getDataEjecucion(`${ano.value}¦${selected.join(',')}`);
            showData(data)
      })
}
