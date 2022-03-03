
var arrData = [];
$(async function() {
      // $('.selectpicker').selectpicker();
      data = await getDataEjecucion(`2021¦1,2,3,4,5,6¦`);
      showData(data)
      showFilter()
      createExcelExportXLXS();
      btnSearch();
});

function showFilter() {
      const result2 = arrData.reduce((unique, o) => {
            if(!unique.some(obj => obj.Cat_Cod === o.Cat_Cod && obj.Cat_DESC === o.Cat_DESC)) {
              unique.push(o);
            }
            return unique;
        },[]);
      const unique10 = [...new Set(result2 .map(item => [item.Cat_COD, item.Cat_DESC]))];
      
      var select = document.getElementById("cmbCategoria"); //Seleccionamos el select
    
      for(var i=0; i < unique10.length; i++){ 
          var option = document.createElement("option"); //Creamos la opcion
          option.value = unique10[i][0];
          option.innerHTML = unique10[i][1]; //Metemos el texto en la opción
          select.appendChild(option); //Metemos la opción en el select
      }
}

function getDataEjecucion(trama) {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/internacionalizacion/data',
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

      let arr     

      $.each(data.data_ppto_2021_ing, function (i, item) {
            
            // PTTO <=============
            // 2021 INGRESO <=====
            col1 = (item.Total*1)

            // 2021 EGRESO <=====
            arryCommon = [];
            arryCommon = data.data_ppto_2021_egr.filter( x => x.Cat_COD == item.Cat_COD && x.Subcat_COD == item.Subcat_COD && x.Nivel_4_COD == item.Nivel_4_COD)
            if( arryCommon.length > 0) col2 = (arryCommon[0].Total*1)
            else col2 = 0

            // EJECUCIÓN <=============
            // 2021 INGRESO <=====
            arryCommon = [];
            arryCommon = data.data_eje_2021_ing.filter( x => x.Cat_COD == item.Cat_COD && x.Subcat_COD == item.Subcat_COD && x.Nivel_4_COD == item.Nivel_4_COD)
            if( arryCommon.length > 0) col3 = (arryCommon[0].Total*1)
            else col3 = 0

            // 2021 EGRESO <=====
            arryCommon = [];
            arryCommon = data.data_eje_2021_egr.filter( x => x.Cat_COD == item.Cat_COD && x.Subcat_COD == item.Subcat_COD && x.Nivel_4_COD == item.Nivel_4_COD)
            if( arryCommon.length > 0) col4 = (arryCommon[0].Total*1)
            else col4 = 0

            // COMPROMISOS* <=============
            // 2021 INGRESO <=====
            col5 = 0

            // 2021 EGRESO <=====
            arryCommon = [];
            arryCommon = data.data_com_2021.filter( x => x.Cat_COD == item.Cat_COD && x.Subcat_COD == item.Subcat_COD && x.Nivel_4_COD == item.Nivel_4_COD)
            if( arryCommon.length > 0) col6 = (arryCommon[0].Total*1)
            else col6 = 0

            col7 = (+col1 - col3 - col5)
            col7 = isNaN(col7) ? 0 : isFinite(col7) ? (col7) : 0;
            col8 = (+col2 - col4 - col6)
            col8 = isNaN(col8) ? 0 : isFinite(col8) ? (col8) : 0;
            col9 = 0
            col10 = (+col4 + col6) / col2
            col10 = isNaN(col10) ? 0 : isFinite(col10) ? (col10) * 100 : 0;

            // TABLA
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Cat_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Subcat_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_4_COD } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_4_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col1.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col2.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col3.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col4.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col5.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col6.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col7.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col8.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col10.toFixed() }% </td>\
                  </tr>`;

            // ARR EXCEL
            arrData.push({
                  Cat_COD : item.Cat_COD,
                  Cat_DESC : item.Cat_DESC,
                  Subcat_COD : item.Subcat_COD,
                  Subcat_DESC : item.Subcat_DESC,
                  Nivel_4_COD : item.Nivel_4_COD,
                  Nivel_4_DESC : item.Nivel_4_DESC,
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
            // let cabeceras = `DIRECCIÓN / UNIDAD¦PARTIDA¦DESCRIPCIÓN PARTIDA¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦EJECUCIÓN 2021¦${hejec2020}¦Avance 2020¦${hejec2021}¦Avance 2021¦${hvarmontomeses}¦${hvarpocentajemeses}`.split("¦");
            let cabeceras = `DIRECCIÓN / UNIDAD¦PARTIDA¦DESCRIPCIÓN PARTIDA¦PRESUPUESTO ANUAL 2021¦EJECUTADO ${mesDesdeTexto}-${mesHastaTexto}¦COMPROMISOS*¦SALDO 2021¦AVANCE 2021 (%)`.split("¦");
            let cabeceras2 = `INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS¦INGRESOS¦EGRESOS`.split("¦");
            
            let cells = []    
            let dataArray = []
            let index = 0;
            
            dataArray.push(addRowExcelnHeader(11))
            dataArray.push(addRowExcelnHeader(11, 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', 2, 11))
            // dataArray.push(addRowExcelnHeader(11, 'Al cierre de Junio preliminar 2021 / En S/. 000', 2, 9))
            dataArray.push(addRowExcelnHeader(11, '', 2, 9))
            // dataArray.push(addRowExcelnHeader(5))
            // dataArray.push(addRowExcelnHeader(5))

            cells = []
            for (let index = 0; index < 11; index++) {
                  cells.push({ value: '',borderBottom: { color: "#000", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            }
            dataArray.push({ cells: cells })

            cells = []  
            cabeceras.forEach((row) => {
                  cells.push(
                        { 
                              value: row,
                              colSpan: ( index == 0 || index >= 3 ) ? 2 : 1, 
                              rowSpan: ( index <= 2 ) ? 2 : 1,
                              background: "#1f4e78", 
                              textAlign: "center", 
                              verticalAlign: "center",
                              color: "#ffffff",
                              fontSize: 10, 
                              bold: true, 
                              height: 500, 
                              wrap: true,
                              borderBottom:  { color: "#000000", size: 1 } , 
                              borderLeft: { color: "#000000", size: 1 }, 
                              borderTop: { color: "#000000", size: 1 }, 
                              borderRight: { color: "#000000", size: 1 }
                        })
                  index++;
            })
            dataArray.push({ cells: cells })

            cells = []  
            cabeceras2.forEach((row) => {
                  cells.push(
                        { 
                              value: row,
                              colSpan: 1, 
                              rowSpan: 1,
                              background: "#1f4e78", 
                              textAlign: "center", 
                              verticalAlign: "center",
                              color: "#ffffff",
                              fontSize: 10, 
                              bold: true, 
                              height: 500, 
                              wrap: true,
                              borderBottom:  { color: "#000000", size: 1 } , 
                              borderLeft: { color: "#000000", size: 1 }, 
                              borderTop: { color: "#000000", size: 1 }, 
                              borderRight: { color: "#000000", size: 1 }
                        })
                  index++;
            })
            dataArray.push({ cells: cells })
            
            cells = []
            for (let index = 0; index < 5; index++) {
                  cells.push({ value: '',borderBottom: { color: "#fff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#000", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            }
            dataArray.push({ cells: cells })
            
            let Cat_DESC = ''
            let Subcat_DESC = ''
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

                  if ( Cat_DESC.trim() != item.Cat_DESC.trim() ) {
                        Cat_DESC = item.Cat_DESC

                        total_col1 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD) ? obj.col1 : 0 ) ; }, 0)
                        total_col2 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD) ? obj.col2 : 0 ) ; }, 0)
                        total_col3 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD) ? obj.col3 : 0 ) ; }, 0)
                        total_col4 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD) ? obj.col4 : 0 ) ; }, 0)
                        total_col6 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD) ? obj.col6 : 0 ) ; }, 0)
                        
                        total_col5 = 0;

                        total_col7 = (+total_col1 - total_col3 - total_col5)
                        total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
                        total_col8 = (+total_col2 - total_col4 - total_col6)
                        total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
                        total_col9 = 0
                        total_col10 = (+total_col4 + total_col6) / total_col2
                        total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) * 100 : 0;

                        cells = []
                        cells.push({ value: item.Cat_DESC, colSpan: 2, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: '-', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(total_col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(total_col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })

                        if ( Subcat_DESC.trim() != item.Subcat_DESC.trim() ) { 
                              Subcat_DESC = item.Subcat_DESC

                              total_col1 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD) ? obj.col1 : 0 ) ; }, 0)
                              total_col2 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD) ? obj.col2 : 0 ) ; }, 0)
                              total_col3 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD) ? obj.col3 : 0 ) ; }, 0)
                              total_col4 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD) ? obj.col4 : 0 ) ; }, 0)
                              total_col6 = arrData.reduce(function (acc, obj) { return acc + ( (obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD) ? obj.col6 : 0 ) ; }, 0)
                              
                              total_col5 = 0;
                              total_col7 = (+total_col1 - total_col3 - total_col5)
                              total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
                              total_col8 = (+total_col2 - total_col4 - total_col6)
                              total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
                              total_col9 = 0
                              total_col10 = (+total_col4 + total_col6) / total_col2
                              total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) * 100 : 0;

                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '-', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(total_col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(total_col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })

                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_COD, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col5) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col7) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })
                        } else {

                              
                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_COD, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col5) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col7) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })
                        }

                  } else {

                        if ( Subcat_DESC.trim() != item.Subcat_DESC.trim() ) { 
                              Subcat_DESC = item.Subcat_DESC

                              total_col1 = arrData.reduce(function (acc, obj) { return acc + ((obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD)? obj.col1 : 0 ) ; }, 0)
                              total_col2 = arrData.reduce(function (acc, obj) { return acc + ((obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD)? obj.col2 : 0 ) ; }, 0)
                              total_col3 = arrData.reduce(function (acc, obj) { return acc + ((obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD)? obj.col3 : 0 ) ; }, 0)
                              total_col4 = arrData.reduce(function (acc, obj) { return acc + ((obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD)? obj.col4 : 0 ) ; }, 0)
                              total_col6 = arrData.reduce(function (acc, obj) { return acc + ((obj.Cat_COD == item.Cat_COD && obj.Subcat_COD == item.Subcat_COD)? obj.col6 : 0 ) ; }, 0)
                              
                              total_col5 = 0;
                              total_col7 = (+total_col1 - total_col3 - total_col5)
                              total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
                              total_col8 = (+total_col2 - total_col4 - total_col6)
                              total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
                              total_col9 = 0
                              total_col10 = (+total_col4 + total_col6) / total_col2
                              total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) * 100 : 0;

                              // dataArray.push(addRowExcelnHeader(5))

                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Subcat_DESC, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '-', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(total_col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(total_col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })

                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_COD, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col5) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col7) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })
                        } else {

                              cells = []
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_COD, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: item.Nivel_4_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col3) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col5) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col6) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col7) * 1)), type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: formatImport(item.col8) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              cells.push({ value: ((formatImport(item.col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                              dataArray.push({ cells })
                        }

                  }
            })


            total_col1 = arrData.reduce(function (acc, obj) { return acc + obj.col1 }, 0)
            total_col2 = arrData.reduce(function (acc, obj) { return acc + obj.col2 }, 0)
            total_col3 = arrData.reduce(function (acc, obj) { return acc + obj.col3 }, 0)
            total_col4 = arrData.reduce(function (acc, obj) { return acc + obj.col4 }, 0)
            total_col6 = arrData.reduce(function (acc, obj) { return acc + obj.col6 }, 0)
            
            total_col5 = 0;

            total_col7 = (+total_col1 - total_col3 - total_col5)
            total_col7 = isNaN(total_col7) ? 0 : isFinite(total_col7) ? (total_col7) : 0;
            total_col8 = (+total_col2 - total_col4 - total_col6)
            total_col8 = isNaN(total_col8) ? 0 : isFinite(total_col8) ? (total_col8) : 0;
            total_col9 = 0
            total_col10 = (+total_col4 + total_col6) / total_col2
            total_col10 = isNaN(total_col10) ? 0 : isFinite(total_col10) ? (total_col10) * 100 : 0;

            cells = []
            cells.push({ value: 'Total general', colSpan: 2, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, wrap: true, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col3, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: '-', colSpan: 1, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col6, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col7, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col8, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: ((formatImport(total_col9) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: ((formatImport(total_col10) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells })

            dataArray.push(addRowExcelnHeader(11))

            

            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                        columns: [
                        { width: 70 },
                        { width: 250 },
                        { width: 60 },
                        { width: 200 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 },
                        { width: 70 }
                        ],
                        title: "Internacionalización",
                        rows: dataArray
                      }
                  ]
              });
              kendo.saveAs({
                  dataURI: workbook.toDataURL(),
                  fileName: "Internacionalización.xlsx"
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

function addRowExcelnHeader(nHeader){
      let cells = []
      for (let index = 0; index < nHeader; index++) {
            cells.push({ value: '',borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
      }
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

            hejecutadoingresos.innerHTML = `EJECUTADO ${mesDesdeTexto}-${mesHastaTexto} INGRESOS`
            hejecutadoegresos.innerHTML = `EJECUTADO ${mesDesdeTexto}-${mesHastaTexto} EGRESOS`
            
            fejecutadoingresos.innerHTML = `EJECUTADO ${mesDesdeTexto}-${mesHastaTexto} INGRESOS`
            fejecutadoegresos.innerHTML = `EJECUTADO ${mesDesdeTexto}-${mesHastaTexto} EGRESOS`
            
            console.log(selected.join(','))
            data = await getDataEjecucion(`${ano.value}¦${selected.join(',')}¦${cmbCategoria.value}`);
            showData(data)
      })
}