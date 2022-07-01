
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
                  url: '/fampartidas/data',
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

      arrData = []

      $.each(data.data_eje_2020_ej, function (i, item) {

            // EJECUCIÓN ENE- JUN 2020
            // debugger
            col1 = item.Total * 1

            // EJECUCIÓN ENE-JUN 2021
            arryCommon = [];
            arryCommon = data.data_eje_2021_ej.filter( x => x.Nivel_1_desc == item.Nivel_1_desc && x.Nivel_2_DESC == item.Nivel_2_DESC)
            if( arryCommon.length > 0) col2 = (arryCommon[0].Total*1)
            else col2 = 0

            // col3 = (+col2/col1)
            // col3 = isNaN(col3) ? 0 : isFinite(col3) ? ((col3 - 1) * 100 ) : 0;
            col3 = (+col2-col1)
            col3 = isNaN(col3) ? 0 : (col3/col2)
            col3 = isNaN(col3) ? 0 : isFinite(col3) ? (col3 * 100) : 0;

            arryCommon = [];
            arryCommon = data.data_ppto_2021_ej.filter( x => x.Nivel_1_desc == item.Nivel_1_desc && x.Nivel_2_DESC == item.Nivel_2_DESC)
            if( arryCommon.length > 0) col4 = (arryCommon[0].Total*1)
            else col4 = 0

            // debugger
            // col5 = (+col4/col2)
            // col5 = isNaN(col5) ? 0 : isFinite(col5) ? ((col5 - 1) * 100 ) : 0;

            col5 = (+col2-col4)
            col5 = isNaN(col5) ? 0 : (col5/col2)
            col5 = isNaN(col5) ? 0 : isFinite(col5) ? (col5 * 100) : 0;


            // TABLA
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_1_desc } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_2_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col1.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col4.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col2.toFixed() } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col5.toFixed() }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ col3.toFixed() }% </td>\
                  </tr>`;

            // ARR EXCEL
            arrData.push({
                  Nivel_1_desc : item.Nivel_1_desc,
                  Nivel_2_DESC : item.Nivel_2_DESC,
                  col1 : col1,
                  col4 : col4,
                  col2 : col2,
                  col5 : col5,
                  col3 : col3
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

            let cabeceras = `GRUPO DE PARTIDAS¦${hejecucion2020.innerHTML}¦${hppto2021.innerHTML}¦${hejecucion2021.innerHTML}¦VAR. PPTO INICAL 2021 VS EJEC 2021¦VARIACIÓN 2020 VS 2021`.split("¦");

            let cells = []
            let dataArray = []
            let index = 0;

            dataArray.push(addRowExcelnHeader(5))
            dataArray.push(addRowExcelnHeader(5, 'REPORTE DE EJECUCIÓN PRESUPUESTAL 2021', 2, 11))
            dataArray.push(addRowExcelnHeader(5, 'Al cierre de Junio preliminar 2021 / En S/. 000', 2, 9))
            // dataArray.push(addRowExcelnHeader(5))
            // dataArray.push(addRowExcelnHeader(5))

            cells = []
            for (let index = 0; index < 5; index++) {
                  cells.push({ value: '',borderBottom: { color: "#000", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 }})
            }
            dataArray.push({ cells: cells })

            cells = []
            cabeceras.forEach((row) => {
                  cells.push(
                        {
                              value: row,
                              colSpan: ( index == 0 ) ? 2 : 1,
                              background: "#1f4e78",
                              textAlign: "center",
                              verticalAlign: "center",
                              color: "#ffffff",
                              fontSize: 10,
                              bold: true,
                              height: 300,
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

            let Nivel_1_desc = ''
            let total_col1 = 0;
            let total_col2 = 0;
            let total_col3 = 0;
            let total_col4 = 0;
            let total_col5 = 0;
            cells = []
            // debugger
            $.each(arrData, function (i, item) {

                  if ( Nivel_1_desc.trim() != item.Nivel_1_desc.trim() ) {
                        Nivel_1_desc = item.Nivel_1_desc

                        total_col1 = arrData.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc == item.Nivel_1_desc ? obj.col1 : 0 ) ; }, 0)
                        total_col4 = arrData.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc == item.Nivel_1_desc ? obj.col4 : 0 ) ; }, 0)
                        total_col2 = arrData.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc == item.Nivel_1_desc ? obj.col2 : 0 ) ; }, 0)

                        // total_col5 = (+total_col4/ total_col2)
                        // total_col5 = isNaN(total_col5) ? 0 : isFinite(total_col5) ? (total_col5 - 1) : 0;

                        total_col5 = (+total_col2 - total_col4)
                        total_col5 = isNaN(total_col5) ? 0 : isFinite(total_col5) ? (total_col5 / total_col2) : 0;
                        total_col5 = isNaN(total_col5) ? 0 : isFinite(total_col5) ? (total_col5) : 0;

                        // total_col3 = (+total_col2/ total_col1)
                        // total_col3 = isNaN(total_col3) ? 0 : isFinite(total_col3) ? (total_col3 - 1) : 0;

                        total_col3 = (+total_col2 -  total_col1)
                        total_col3 = isNaN(total_col3) ? 0 : isFinite(total_col3) ? (total_col3/total_col2) : 0;
                        total_col3 = isNaN(total_col3) ? 0 : isFinite(total_col3) ? (total_col3) : 0;

                        dataArray.push(addRowExcelnHeader(5))

                        cells = []
                        cells.push({ value: item.Nivel_1_desc, colSpan: 2, fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col5, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: total_col3, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })

                        cells = []
                        cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Nivel_2_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(item.col5) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(item.col3) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })

                  } else {

                        cells = []
                        cells.push({ value: '', fontSize: 10, background: "#ffffff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: item.Nivel_2_DESC, fontSize: 10, background: "#fff", textAlign: "left", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col1) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col4) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: formatImport(item.col2) * 1, type:"number", format: "#,##0", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(item.col5) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        cells.push({ value: ((formatImport(item.col3) * 1)/100), type:"number", format: "0%", fontSize: 10, background: "#ffffff", textAlign: "right", color: "#000000", bold: false, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
                        dataArray.push({ cells })
                  }
            })

            dataArray.push(addRowExcelnHeader(5))

            let total_col1_ing = 0;
            let total_col1_egr = 0;
            let total_col2_ing = 0;
            let total_col2_egr = 0;
            let total_col3_ing = 0;
            let total_col3_egr = 0;
            let total_col4_ing = 0;
            let total_col4_egr = 0;
            let total_col5_ing = 0;
            let total_col5_egr = 0;

            total_col1_ing = data.data_eje_2020_ej.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)
            total_col1_egr = data.data_eje_2020_ej.reduce(function (acc, obj) { return acc + (!obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)

            total_col4_ing = data.data_ppto_2021_ej.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)
            total_col4_egr = data.data_ppto_2021_ej.reduce(function (acc, obj) { return acc + (!obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)

            total_col2_ing = data.data_eje_2021_ej.reduce(function (acc, obj) { return acc + (obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)
            total_col2_egr = data.data_eje_2021_ej.reduce(function (acc, obj) { return acc + (!obj.Nivel_1_desc.toLowerCase().includes('ingresos') ? obj.Total*1 : 0 ) ; }, 0)

            // total_col5_ing = ((+total_col4_ing)/ total_col2_ing)
            // total_col5_ing = isNaN(total_col5_ing) ? 0 : isFinite(total_col5_ing) ? (total_col5_ing - 1) : 0;

            // total_col5_egr = ((+total_col2_egr)/ total_col1_egr)
            // total_col5_egr = isNaN(total_col5_egr) ? 0 : isFinite(total_col5_egr) ? (total_col5_egr - 1) : 0;

            // total_col3_ing = ((+total_col2_ing)/ total_col1_ing)
            // total_col3_ing = isNaN(total_col3_ing) ? 0 : isFinite(total_col3_ing) ? (total_col3_ing - 1) : 0;

            // total_col3_egr = ((+total_col2_egr)/ total_col1_egr)
            // total_col3_egr = isNaN(total_col3_egr) ? 0 : isFinite(total_col3_egr) ? (total_col3_egr - 1) : 0;

            total_col5_ing = ((+total_col2_ing) - total_col4_ing)
            total_col5_ing = isNaN(total_col5_ing) ? 0 : isFinite(total_col5_ing) ? (total_col5_ing /total_col2_ing ) : 0;
            total_col5_ing = isNaN(total_col5_ing) ? 0 : isFinite(total_col5_ing) ? (total_col5_ing) : 0;

            total_col5_egr = ((+total_col2_egr) - total_col4_egr)
            total_col5_egr = isNaN(total_col5_egr) ? 0 : isFinite(total_col5_egr) ? (total_col5_egr /total_col2_egr ) : 0;
            total_col5_egr = isNaN(total_col5_egr) ? 0 : isFinite(total_col5_egr) ? (total_col5_egr) : 0;

            total_col3_ing = ((+total_col2_ing) - total_col1_ing)
            total_col3_ing = isNaN(total_col3_ing) ? 0 : isFinite(total_col3_ing) ? (total_col3_ing / total_col2_ing) : 0;
            total_col3_ing = isNaN(total_col3_ing) ? 0 : isFinite(total_col3_ing) ? (total_col3_ing) : 0;

            total_col3_egr = ((+total_col2_egr) - total_col1_egr)
            total_col3_egr = isNaN(total_col3_egr) ? 0 : isFinite(total_col3_egr) ? (total_col3_egr /total_col2_egr) : 0;
            total_col3_egr = isNaN(total_col3_egr) ? 0 : isFinite(total_col3_egr) ? (total_col3_egr) : 0;

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'INGRESOS', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col1_ing, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col4_ing, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col2_ing, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col5_ing, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col3_ing, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells })

            cells = []
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'EGRESOS', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col1_egr, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col4_egr, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col2_egr, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col5_egr, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: total_col3_egr, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells })

            let diff_total_col1 = total_col1_ing - total_col1_egr
            let diff_total_col2 = total_col2_ing - total_col2_egr
            let diff_total_col4 = total_col4_ing - total_col4_egr


            // let diff_total_col5 = total_col5_ing - total_col5_egr

            let diff_total_col5 = (+diff_total_col2 - diff_total_col4)
            diff_total_col5 = isNaN(diff_total_col5) ? 0 : isFinite(diff_total_col5) ? (diff_total_col5 / diff_total_col2) : 0;
            diff_total_col5 = isNaN(diff_total_col5) ? 0 : isFinite(diff_total_col5) ? (diff_total_col5) : 0;


            // let diff_total_col3 = total_col3_ing - total_col3_egr
            let diff_total_col3 = (+diff_total_col2 - diff_total_col1)
            diff_total_col3 = isNaN(diff_total_col3) ? 0 : isFinite(diff_total_col3) ? (diff_total_col3 / diff_total_col2) : 0;
            diff_total_col3 = isNaN(diff_total_col3) ? 0 : isFinite(diff_total_col3) ? (diff_total_col3) : 0;

            //nuevo
            cells = []
            cells.push({ value: '', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: 'SUPERAVIT', fontSize: 10, background: "#D3E8FF", textAlign: "left", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: diff_total_col1, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: diff_total_col4, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: diff_total_col2, type:"number", format: "#,##0", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: diff_total_col5, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            cells.push({ value: diff_total_col3, type:"number", format: "0%", fontSize: 10, background: "#D3E8FF", textAlign: "right", color: "#000000", bold: true, height: 100, borderBottom: { color: "#ffffff", size: 1 }, borderLeft: { color: "#ffffff", size: 1 }, borderTop: { color: "#ffffff", size: 1 }, borderRight: { color: "#ffffff", size: 1 } })
            dataArray.push({ cells })

            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                        columns: [
                        { width: 50 },
                        { width: 250 },
                        { width: 100 },
                        { width: 100 },
                        { width: 100 },
                        { width: 100 },
                        { width: 100 }
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
            var selectedAno = $('#ano').find('option:selected');

            let mesDesdeId = selectedDesde.val() * 1
            let mesDesdeTexto = selectedDesde.text().substr(0,3)

            let mesHastaId = selectedHasta.val() * 1
            let mesHastaTexto = selectedHasta.text().substr(0,3)

            let anoId = selectedAno.val() * 1
            let anoOldId = anoId - 1

            var selected = [];

            for (let index = mesDesdeId; index <= mesHastaId; index++) {
                  selected.push( index );
            }

            hppto2021.innerHTML = `PPTOO INICIAL ${anoId}`
            hvarpptoejec.innerHTML = `VAR. PPTO INICAL ${anoId} VS EJEC ${anoId}`
            hvarppto.innerHTML = `VARIACIÓN ${anoOldId} VS ${anoId}`

            hejecucion2020.innerHTML = `EJECUCIÓN ${mesDesdeTexto}-${mesHastaTexto} ${anoOldId}`
            hejecucion2021.innerHTML = `EJECUCIÓN ${mesDesdeTexto}-${mesHastaTexto} ${anoId}`

            fejecucion2020.innerHTML = `EJECUCIÓN ${mesDesdeTexto}-${mesHastaTexto} ${anoOldId}`
            fejecucion2021.innerHTML = `EJECUCIÓN ${mesDesdeTexto}-${mesHastaTexto} ${anoId}`

            fppto2021.innerHTML = `PPTOO INICIAL ${anoId}`
            fvarpptoejec.innerHTML = `VAR. PPTO INICAL ${anoId} VS EJEC ${anoId}`
            fvarppto.innerHTML = `VARIACIÓN ${anoOldId} VS ${anoId}`

            console.log(selected.join(','))
            data = await getDataEjecucion(`${ano.value}¦${selected.join(',')}`);
            showData(data)
      })
}
