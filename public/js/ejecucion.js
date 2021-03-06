
// let data;
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
                  url: '/ejecucion/data',
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
      
      // let data_ppto_2021 = data.data_ppto_2021
      // let data_eje_2021 = data.data_ejec_2021
      // let data_com_2021 = data.data_com_2021

      // $("#tbody").empty()
      // let text = '';
      // let edeje2020 = 0;
      // let edeje2021 = 0;
      // let edppto2020 = 0;
      // let edppto2021 = 0;
      // let edcom2020 = 0;
      // let edcom2021 = 0;
      // let edejec2020_ene_jun = 0
      // let arrayFilterppto2021 = [];
      // let arrayFiltereje2021 = [];
      // let arrayFiltercom2021 = [];
      // let arryCommon = [];
      // let itemppto2021 = null;
      // let itemeje2021 = null;
      // let itemcom2021 = null;
      
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
      let col11 = 0;
      let col12 = 0;
      arrData = []

      $.each(data.data_ejec_2020, function (i, item) {
            
            // EJEC <=============
            // 2020 - 1/6  <=====
            col1 = (item.Total*1)
            // 2020 - 1/6  <=====
            arryCommon = [];
            arryCommon = data.data_ejec_2020_ej.filter( x => x.Subcat_DESC == item.Subcat_DESC && x.Subcat_COD == item.Subcat_COD)
            if( arryCommon.length > 0) col3 = (arryCommon[0].Total*1)
            else col3 = 0  
            // 2021
            arryCommon = [];
            arryCommon = data.data_ejec_2021_ej.filter( x => x.Subcat_DESC == item.Subcat_DESC && x.Subcat_COD == item.Subcat_COD)
            if( arryCommon.length > 0) col5 = (arryCommon[0].Total*1)
            else col5 = 0  

            // PPTO <=============
            //2021 1/12  <=====
            arryCommon = [];
            arryCommon = data.data_ppto_2021.filter( x => x.Subcat_DESC == item.Subcat_DESC && x.Subcat_COD == item.Subcat_COD)
            if( arryCommon.length > 0) col2 = (arryCommon[0].Total*1)
            else col2 = 0

            // COM <==  ===========
            //2021 1/12  <=====
            arryCommon = [];
            arryCommon = data.data_com_2021.filter( x => x.Subcat_DESC == item.Subcat_DESC && x.Subcat_COD == item.Subcat_COD)
            if( arryCommon.length > 0) col7 = (arryCommon[0].Total*1)
            else col7 = 0  

            // AVANCE <=============
            // 2020  <=====
            col4 = (col3/col1)
            col4 = isNaN(col4) ? 0 : isFinite(col4) ? (col4*100) : 0;
            // 2021  <=====
            col6 = (col5/col2)
            col6 = isNaN(col6) ? 0 : isFinite(col6) ? (col6*100) : 0;

            // EJEC+ COMP
            // 2021  <=====
            col8 = (col5+col7)
            col8 = isNaN(col8) ? 0 : (col8*1)

            // VAR ENE-JUN 2020-2021
            // MONTO
            col9 = (col5-col3)
            col9 = isNaN(col9) ? 0 : (col9*1)
            // PORCENTAJE
            col10 = (col5/col3)
            col10 = isNaN(col10) ? 0 : isFinite(col10) ? ((col10-1)*100) : 0;
            
            // SALDO 2021
            // MONTO
            col11 = (col2-col8)
            col11 = isNaN(col11) ? 0 : (col11*1)
            // PORCENTAJE
            col12 = (col8/col2)
            col12 = isNaN(col12) ? 0 : isFinite(col12) ? (col12*100) : 0;

            // TABLA
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Cat_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Subcat_CONCEPTO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Subcat_FAMILIA } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Subcat_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col1.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col2.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col3.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col4.toFixed() }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col5.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col6.toFixed() }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col7.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col8.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col9.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col10.toFixed() }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col11.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col12.toFixed() }% </td>\
                     </tr>`;

            // ARR EXCEL
            arrData.push({
                  Cat_DESC : item.Cat_DESC,
                  Subcat_CONCEPTO : item.Subcat_CONCEPTO,
                  Subcat_FAMILIA : item.Subcat_FAMILIA,
                  Subcat_DESC : item.Subcat_DESC,
                  col1 : col1,
                  col2 : col2,
                  col3 : col3,
                  col4 : col4,
                  col5 : col5,
                  col6 : col6,
                  col7 : col7,
                  col8 : col8,
                  col9 : col9,
                  col10 : col10,
                  col11 : col11,
                  col12 : col12,
            })
      });

      $('#dataTable').DataTable().clear();
      $('#dataTable').DataTable().destroy();
      $("#tbody").append(text)
      tableData = $('#dataTable').DataTable({
            order : [[0, 'desc']],
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
            // let cabeceras = "CONCEPTO¦FAMILIA DE PARTIDA¦DETALLE¦ENERO¦FEBRERO¦MARZO¦ABRIL¦MAYO¦JUNIO¦JULIO¦AGOSTO¦SEPTIEMBRE¦OCTUBRE¦NOVIEMBRE¦DICIEMBRE¦EJEC2020 ENEDIC¦PPTO2021 ENEDIC¦EJEC2020 ENEJUN¦AVANCE 2020¦EJEC2021 ENEJUN¦AVANCE EJEC 2021¦COMPROMISOS 2021¦EJEC+COMP 2021¦VAR ENE-JUN 2020-2021/Monto¦VAR ENE-JUN 2020-2021/%¦SALDO 2021/Monto¦SALDO 2021/%".split("¦");
            let cabeceras = `CONCEPTO¦FAMILIA DE PARTIDA¦DETALLE¦EJEC2020 ENEDIC¦PPTO2021 ENEDIC¦${hejec2020meses.innerHTML}¦AVANCE 2020¦${hejec2021meses.innerHTML}¦AVANCE EJEC 2021¦COMPROMISOS 2021¦EJEC+COMP 2021¦${hvar2021montomeses.innerHTML}¦${hvar2021pocentajemeses.innerHTML}¦SALDO 2021/Monto¦SALDO 2021/%`.split("¦");
            let cells = []    
            let dataArray = []
            let index = 0;
            
            dataArray.push(addRowExcelnHeader(15))
            dataArray.push(addRowExcelnHeader(12, 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', 2, 11))
            // dataArray.push(addRowExcelnHeader(12, 'Al cierre de Junio preliminar 2021 / En S/. 000', 2, 9))
            dataArray.push(addRowExcelnHeader(12, '', 2, 9))

            // cells = [] 
            // cells.push({ value: 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', colSpan: 2, fontSize: 11, bold: true})
            // dataArray.push({ cells: cells })
            
            // cells = [] 
            // cells.push({ value: 'Al cierre de Junio preliminar 2021 / En S/. 000', colSpan: 2, fontSize: 9})
            // dataArray.push({ cells: cells })
            
            dataArray.push(addRowExcelnHeader(15))

            cells = []  
            cabeceras.forEach((row) => {
                  cells.push(
                        { 
                              value: row, 
                              width: (index <= 2 ) ? 280 : 150,
                              background: "#1f4e78", //(index <= 2 ) ? "#1f4e78" : "#ffffff", 
                              textAlign: "center", 
                              color: "#ffffff", //(index <= 2 ) ? "#ffffff" : "#000000", 
                              fontSize: 10, 
                              bold: true, 
                              height: 180, 
                              borderBottom: { color: "#000000", size: 1 }, 
                              borderLeft: { color: "#000000", size: 1 }, //(index <= 2 ) ? { color: "#000000", size: 1 } : {}, 
                              borderTop: { color: "#000000", size: 1 }, //(index <= 2 ) ? { color: "#000000", size: 1 } : {}, 
                              borderRight: { color: "#000000", size: 1 } //(index <= 2 ) ? { color: "#000000", size: 1 } : {}
                        })
                  index++;
            })
            dataArray.push({ cells: cells })
                
            let Cat_DESC = ''

            let total_col1 = 0;
            let total_col2 = 0;
            let total_col3 = 0;
            let total_col5 = 0;
            let total_col7 = 0;
            let total_col8 = 0;
            
            // arrData.sort( compareAgrupador );
            // arrData.sort( compare );
            let arrTotales = []
            $.each(arrData , function (i, item) {
                  // debugger
                  cells = [] 
                  // debugger
                  if ( Cat_DESC != item.Cat_DESC ) {
                        // debugger
                        Cat_DESC = item.Cat_DESC
                        
                        // total_EJEC_2020_ENE_DIC = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.EJEC_2020_ENE_DIC : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col1 = sumaTransferenciaInterna(Cat_DESC,'col1')
                        else total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col1 : 0 ) ; }, 0)

                        // total_PPTO_2021_ENE_DIC = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.PPTO_2021_ENE_DIC : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col2 = sumaTransferenciaInterna(Cat_DESC,'col2')
                        else total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col2 : 0 ) ; }, 0)

                        // total_EJEC_2020_ENE_JUN = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.EJEC_2020_ENE_JUN : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col3 = sumaTransferenciaInterna(Cat_DESC,'col3')
                        else total_col3 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col3 : 0 ) ; }, 0)

                        total_col4 = total_col3 / total_col1
                        total_col4 = isNaN(total_col4) ? 0 : (total_col4*100)

                        // total_EJEC_2021_ENE_JUN = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.EJEC_2021_ENE_JUN : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col5 = sumaTransferenciaInterna(Cat_DESC,'col5')
                        else total_col5 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col5 : 0 ) ; }, 0)

                        total_col6 = total_col5 / total_col2
                        total_col6 = isNaN(total_col6) ? 0 : (total_col6*100)

                        // total_COMPROMISOS_2021 = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.COMPROMISOS_2021 : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col7 = sumaTransferenciaInterna(Cat_DESC,'col7')
                        else total_col7 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col7 : 0 ) ; }, 0)
                        
                        // total_EJEC_COMP_2021 = arrData.reduce(function (acc, obj) { return acc + (obj.agrupador1 == agrupador1 ? obj.EJEC_COMP_2021 : 0 ) ; }, 0)
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) total_col8 = sumaTransferenciaInterna(Cat_DESC,'col8')
                        else total_col8 = arrData.reduce(function (acc, obj) { return acc + (obj.Cat_DESC == Cat_DESC ? obj.col8 : 0 ) ; }, 0)
                        
                        total_col9 = total_col5 - total_col3
                        total_col9 = isNaN(total_col9) ? 0 : (total_col9*1)

                        total_col10 = total_col5 / total_col3
                        total_col10 = isFinite(total_col10) ? isNaN(total_col10) ? 0 : ((total_col10 - 1)*100) : 0;

                        total_col11 = total_col2 - total_col8
                        total_col11 = isFinite(total_col11) ? isNaN(total_col11) ? 0 : (total_col11*1) : 0

                        total_col12 = total_col8 / total_col2
                        total_col12 = isFinite(total_col12) ? isNaN(total_col12) ? 0 : (total_col12*100) : 0

                        // Resultados Operativos
                        if ( Cat_DESC.includes('TRANSFERENCIA INTERNA') ) {
                              let totalro_col1 = arrTotales[0].col1 - arrTotales[1].col1;
                              let totalro_col2 = arrTotales[0].col2 - arrTotales[1].col2;
                              let totalro_col3 = arrTotales[0].col3 - arrTotales[1].col3;
                              let totalro_col4 = totalro_col3 / totalro_col1;
                              totalro_col4 = isFinite(totalro_col4) ? isNaN(totalro_col4) ? 0 : totalro_col4 : 0;
                              let totalro_col5 = arrTotales[0].col5 - arrTotales[1].col5;
                              let totalro_col6 = totalro_col5 / totalro_col2;
                              totalro_col6 = isFinite(totalro_col6) ? isNaN(totalro_col6) ? 0 : totalro_col6 : 0;
                              let totalro_col7 = arrTotales[0].col7 - arrTotales[1].col7;
                              let totalro_col8 = arrTotales[0].col8 - arrTotales[1].col8; 
                              let totalro_col9 = arrTotales[0].col9 - arrTotales[1].col9;
                              let totalro_col10 = (totalro_col5 / totalro_col3) -1;
                              totalro_col10 = isFinite(totalro_col10) ? isNaN(totalro_col10) ? 0 : totalro_col10 : 0;
                              let totalro_col11 = arrTotales[0].col11 - arrTotales[1].col11;
                              let totalro_col12 = totalro_col8 / totalro_col2;
                              totalro_col12 = isFinite(totalro_col12) ? isNaN(totalro_col12) ? 0 : totalro_col12 : 0;
                              
                              cells = []
                              cells.push({ value: 'RESULTADO OPERATIVO', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              
                              cells.push({ value: totalro_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col4, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col5, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col6, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col9, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col10, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col11, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: totalro_col12, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells: cells })
                        }

                        // Totales
                        arrTotales.push({
                              col1 : total_col1,
                              col2 : total_col2,
                              col3 : total_col3,
                              col4 : total_col4,
                              col5 : total_col5,
                              col6 : total_col6,
                              col7 : total_col7,
                              col8 : total_col8,
                              col9 : total_col9,
                              col10 : total_col10,
                              col11 : total_col11,
                              col12 : total_col12,
                        })

                        if ( i != 0) {
                              cells = []
                              cabeceras.forEach((row) => {
                                    cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
                              })
                              dataArray.push({ cells })
                        }

                        cells = []
                        cells.push({ value: item.Cat_DESC, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        
                        cells.push({ value: formatImport(total_col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col9) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col10) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(total_col11) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(total_col12) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells: cells })

                        cells = []
                        cells.push({ value: item.Subcat_CONCEPTO, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Subcat_FAMILIA, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        
                        cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col9) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col10) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col11) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col12) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })

                        dataArray.push({ cells: cells })
                  } else {

                        cells.push({ value: item.Subcat_CONCEPTO, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Subcat_FAMILIA, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        
                        cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col4) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col5) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col6) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col7) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col9) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col10) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col11) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: (formatImport(item.col12) * 1) / 100, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })

                        dataArray.push({ cells: cells })
                  }

            })

            // RESULTADO GENERAL

            // BLANCO
            cells = []
            cabeceras.forEach((row) => {
                  cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            })
            dataArray.push({ cells })

            // INGRESOS
            let totalrgi_col1 = arrTotales[0].col1 + sumaTransferenciaInternaRG('col1', 'INGRESO');
            let totalrgi_col2 = arrTotales[0].col2 + sumaTransferenciaInternaRG('col2', 'INGRESO');
            let totalrgi_col3 = arrTotales[0].col3 + sumaTransferenciaInternaRG('col3', 'INGRESO');
            let totalrgi_col5 = arrTotales[0].col5 + sumaTransferenciaInternaRG('col5', 'INGRESO');
            let totalrgi_col7 = arrTotales[0].col7 + sumaTransferenciaInternaRG('col7', 'INGRESO');

            totalrgi_col1 = isNaN(totalrgi_col1) ? 0 : isFinite(totalrgi_col1) ? totalrgi_col1: 0;
            totalrgi_col2 = isNaN(totalrgi_col2) ? 0 : isFinite(totalrgi_col2) ? totalrgi_col2: 0;
            totalrgi_col3 = isNaN(totalrgi_col3) ? 0 : isFinite(totalrgi_col3) ? totalrgi_col3: 0;
            totalrgi_col5 = isNaN(totalrgi_col5) ? 0 : isFinite(totalrgi_col5) ? totalrgi_col5: 0;
            totalrgi_col7 = isNaN(totalrgi_col7) ? 0 : isFinite(totalrgi_col7) ? totalrgi_col7: 0;

            // debugger
            let totalrgi_col4 = totalrgi_col3 / totalrgi_col1;
            totalrgi_col4 = isFinite(totalrgi_col4) ? isNaN(totalrgi_col4) ? 0 : totalrgi_col4 : 0;
            let totalrgi_col6 = totalrgi_col5 / totalrgi_col2;
            totalrgi_col6 = isFinite(totalrgi_col6) ? isNaN(totalrgi_col6) ? 0 : totalrgi_col6 : 0;
            let totalrgi_col8 = totalrgi_col5 + totalrgi_col7; 
            let totalrgi_col9 = totalrgi_col5 - totalrgi_col3;
            let totalrgi_col10 = (totalrgi_col5 / totalrgi_col3) -1;
            totalrgi_col10 = isFinite(totalrgi_col10) ? isNaN(totalrgi_col10) ? 0 : totalrgi_col10 : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'INGRESOS', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col2, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            
            cells.push({ value: totalrgi_col3, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col4, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col5, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col6, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col7, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col8, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col9, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrgi_col10, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })

            // EGRESOS
            let totalrge_col1 = arrTotales[1].col1 + sumaTransferenciaInternaRG('col1', 'EGRESO');
            let totalrge_col2 = arrTotales[1].col2 + sumaTransferenciaInternaRG('col2', 'EGRESO');
            let totalrge_col3 = arrTotales[1].col3 + sumaTransferenciaInternaRG('col3', 'EGRESO');
            let totalrge_col5 = arrTotales[1].col5 + sumaTransferenciaInternaRG('col5', 'EGRESO');
            let totalrge_col7 = arrTotales[1].col7 + sumaTransferenciaInternaRG('col7', 'EGRESO');

            totalrge_col1 = isNaN(totalrge_col1) ? 0 : isFinite(totalrge_col1) ? totalrge_col1: 0;
            totalrge_col2 = isNaN(totalrge_col2) ? 0 : isFinite(totalrge_col2) ? totalrge_col2: 0;
            totalrge_col3 = isNaN(totalrge_col3) ? 0 : isFinite(totalrge_col3) ? totalrge_col3: 0;
            totalrge_col5 = isNaN(totalrge_col5) ? 0 : isFinite(totalrge_col5) ? totalrge_col5: 0;
            totalrge_col7 = isNaN(totalrge_col7) ? 0 : isFinite(totalrge_col7) ? totalrge_col7: 0;

            let totalrge_col4 = totalrge_col3 / totalrge_col1;
            totalrge_col4 = isFinite(totalrge_col4) ? isNaN(totalrge_col4) ? 0 : totalrge_col4 : 0;
            let totalrge_col6 = totalrge_col5 / totalrge_col2;
            totalrge_col6 = isFinite(totalrge_col6) ? isNaN(totalrge_col6) ? 0 : totalrge_col6 : 0;
            let totalrge_col8 = totalrge_col5 + totalrge_col7; 
            let totalrge_col9 = totalrge_col5 - totalrge_col3;
            let totalrge_col10 = (totalrge_col5 / totalrge_col3) -1;
            totalrge_col10 = isFinite(totalrge_col10) ? isNaN(totalrge_col10) ? 0 : totalrge_col10 : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'EGRESOS', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col2, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            
            cells.push({ value: totalrge_col3, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col4, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col5, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col6, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col7, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col8, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col9, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalrge_col10, type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })

            // TOTALES

            // debugger
            let totalei_col1 = totalrgi_col1 - totalrge_col1;
            let totalei_col2 = totalrgi_col2 - totalrge_col2;
            let totalei_col3 = totalrgi_col3 - totalrge_col3;
            let totalei_col5 = totalrgi_col5 - totalrge_col5;
            let totalei_col7 = totalrgi_col7 - totalrge_col7;

            totalei_col1 = isNaN(totalei_col1) ? 0 : isFinite(totalei_col1) ? totalei_col1: 0;
            totalei_col2 = isNaN(totalei_col2) ? 0 : isFinite(totalei_col2) ? totalei_col2: 0;
            totalei_col3 = isNaN(totalei_col3) ? 0 : isFinite(totalei_col3) ? totalei_col3: 0;
            totalei_col5 = isNaN(totalei_col5) ? 0 : isFinite(totalei_col5) ? totalei_col5: 0;
            totalei_col7 = isNaN(totalei_col7) ? 0 : isFinite(totalei_col7) ? totalei_col7: 0;

            let totalei_col4 = totalei_col3 / totalei_col1;
            totalei_col4 = isFinite(totalei_col4) ? isNaN(totalei_col4) ? 0 : totalei_col4: 0;
            let totalei_col6 = totalei_col5 / totalei_col2;
            totalei_col6 = isFinite(totalei_col6) ? isNaN(totalei_col6) ? 0 : totalei_col6: 0;
            let totalei_col8 = totalei_col5 + totalei_col7; 
            let totalei_col9 = totalei_col5 - totalei_col3;
            let totalei_col10 = (totalei_col5 / totalei_col3) -1;
            totalei_col10 = isFinite(totalei_col10) ? isNaN(totalei_col10) ? 0 : totalei_col10: 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            
            cells.push({ value: totalei_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col4, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col5, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col6, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col9, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: totalei_col10, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells: cells })


            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                          columns: [
                              { width: 200 },
                              { width: 200 },
                              { width: 200 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
                              { width: 100 },
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

            hejec2020meses.innerHTML = `EJEC-2020 ${mesDesdeTexto}-${mesHastaTexto}`
            hejec2021meses.innerHTML = `EJEC-2021 ${mesDesdeTexto}-${mesHastaTexto}`
            hvar2021montomeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 Monto`
            hvar2021pocentajemeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 %`
            
            fejec2020meses.innerHTML = `EJEC-2020 ${mesDesdeTexto}-${mesHastaTexto}`
            fejec2021meses.innerHTML = `EJEC-2021 ${mesDesdeTexto}-${mesHastaTexto}`
            fvar2021montomeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 Monto`
            fvar2021pocentajemeses.innerHTML = `VAR-${mesDesdeTexto}-${mesHastaTexto}-2020-2021 %`

            // $(options).each(function(){
            //       selected.push( $(this).val() );
            // });
            console.log(selected.join(','))
            data = await getDataEjecucion(`${ano.value}¦${selected.join(',')}`);
            showData(data)
      })
}
