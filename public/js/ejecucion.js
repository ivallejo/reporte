// let data;
$(async function() {
     data = await getDataEjecucion();
//      debugger
     showData(data)
     createExcelExportXLXS();
//      console.log(data);
});



function getDataEjecucion() {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/ejecucion/data',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel
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
      $.each(data.data, function (i, item) {
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_1_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_2_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_4_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.ENERO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.FEBRERO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.MARZO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.ABRIL} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.MAYO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.JUNIO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.JULIO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.AGOSTO} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.SEPTIEMBRE} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.OCTUBRE} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.NOVIEMBRE} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.DICIEMBRE} </td>\
                        <td class="text-center" style="padding-right:30px">  </td>\
                        <td class="text-center" style="padding-right:30px">  </td>\
                     </tr>`;
            
      });
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

      btnDownload.onclick = function () {
            let cabeceras = "CONCEPTO¦FAMILIA DE PARTIDA¦DETALLE¦ENERO¦FEBRERO¦MARZO¦ABRIL¦MAYO¦JUNIO¦JULIO¦AGOSTO¦SEPTIEMBRE¦OCTUBRE¦NOVIEMBRE¦DICIEMBRE¦EJEC2020 ENEDIC¦PPTO2021 ENEDIC".split("¦");
            let cells = []    
            let dataArray = []
            let index = 0;
            
            cabeceras.forEach((row) => {
                  cells.push({ value: ''})
            })
            dataArray = [{ cells }]

            cells = []  
            cabeceras.forEach((row) => {
                  cells.push(
                        { 
                              value: row, width: 350,
                              background: (index <= 2 ) ? "#1f4e78" : "#ffffff", 
                              textAlign: "center", 
                              color: (index <= 2 ) ? "#ffffff" : "#000000", 
                              fontSize: 10, 
                              bold: true, 
                              height: 180, 
                              borderBottom: { color: "#000000", size: 1 }, 
                              borderLeft:  (index <= 2 ) ? { color: "#000000", size: 1 } : {}, 
                              borderTop: (index <= 2 ) ? { color: "#000000", size: 1 } : {}, 
                              borderRight: (index <= 2 ) ? { color: "#000000", size: 1 } : {}
                        })
                  index++;
            })
            // dataArray = [{ cells }]
            dataArray.push({ cells: cells })

             
            $.each(data.data, function (i, item) {
                  cells = [] 
                  cells.push({ value: item.Nivel_1_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.Nivel_2_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.Nivel_4_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.ENERO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.FEBRERO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.MARZO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.ABRIL, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.MAYO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.JUNIO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.JULIO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.AGOSTO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.SEPTIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.OCTUBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.NOVIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item.DICIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  
                  dataArray.push({ cells: cells })
            })

            var workbook = new kendo.ooxml.Workbook({
                  sheets: [
                      {
                          columns: [
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 }
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