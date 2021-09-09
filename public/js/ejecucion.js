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
      
      let data_ppto_2021 = data.data_ppto_2021
      let data_eje_2021 = data.data_ejec_2021
      let data_com_2021 = data.data_com_2021

      $("#tbody").empty()
      let text = '';
      let edeje2020 = 0;
      let edeje2021 = 0;
      let edppto2020 = 0;
      let edppto2021 = 0;
      let edcom2020 = 0;
      let edcom2021 = 0;
      let edejec2020_ene_jun = 0
      let arrayFilterppto2021 = [];
      let arrayFiltereje2021 = [];
      let arrayFiltercom2021 = [];
      let itemppto2021 = null;
      let itemeje2021 = null;
      let itemcom2021 = null;

      $.each(data.data_ejec_2020, function (i, item) {
            
            // Current Year
            // PTTO
            arrayFilterppto2021 = data_ppto_2021.filter( x => x.Nivel_4_DESC == item.Nivel_4_DESC)
            if( arrayFilterppto2021.length > 0) {
                  itemppto2021 = arrayFilterppto2021[0]
                  edppto2021 = (itemppto2021.ENERO * 1) + (itemppto2021.FEBRERO * 1) + (itemppto2021.MARZO * 1) + (itemppto2021.ABRIL * 1) + (itemppto2021.MAYO * 1) + (itemppto2021.JUNIO * 1) + (itemppto2021.JULIO * 1) + (itemppto2021.AGOSTO * 1) + (itemppto2021.SEPTIEMBRE * 1) + (itemppto2021.OCTUBRE * 1) + (itemppto2021.NOVIEMBRE * 1) + (itemppto2021.DICIEMBRE * 1);
            } else {
                  edppto2021 = 0  
            }
            // EJEC
            arrayFiltereje2021 = data_eje_2021.filter( x => x.Nivel_4_DESC == item.Nivel_4_DESC)
            if( arrayFiltereje2021.length > 0) {
                  itemeje2021 = arrayFiltereje2021[0]
                  edeje2021 = (itemeje2021.ENERO * 1) + (itemeje2021.FEBRERO * 1) + (itemeje2021.MARZO * 1) + (itemeje2021.ABRIL * 1) + (itemeje2021.MAYO * 1) + (itemeje2021.JUNIO * 1) + (itemeje2021.JULIO * 1) + (itemeje2021.AGOSTO * 1) + (itemeje2021.SEPTIEMBRE * 1) + (itemeje2021.OCTUBRE * 1) + (itemeje2021.NOVIEMBRE * 1) + (itemeje2021.DICIEMBRE * 1);
            } else {
                  edeje2021 = 0  
            }
            // COM
            arrayFiltercom2021 = data_com_2021.filter( x => x.Nivel_4_DESC == item.Nivel_4_DESC)
            if( arrayFiltercom2021.length > 0) {
                  itemcom2021 = arrayFiltercom2021[0]
                  edcom2021 = (itemcom2021.ENERO * 1) + (itemcom2021.FEBRERO * 1) + (itemcom2021.MARZO * 1) + (itemcom2021.ABRIL * 1) + (itemcom2021.MAYO * 1) + (itemcom2021.JUNIO * 1) + (itemcom2021.JULIO * 1) + (itemcom2021.AGOSTO * 1) + (itemcom2021.SEPTIEMBRE * 1) + (itemcom2021.OCTUBRE * 1) + (itemcom2021.NOVIEMBRE * 1) + (itemcom2021.DICIEMBRE * 1);
            } else {
                  edcom2021 = 0  
            }

            // Last Year
            //EJEC
            edeje2020 = (item.ENERO * 1) + (item.FEBRERO * 1) + (item.MARZO * 1) + (item.ABRIL * 1) + (item.MAYO * 1) + (item.JUNIO * 1) + (item.JULIO * 1) + (item.AGOSTO * 1) + (item.SEPTIEMBRE * 1) + (item.OCTUBRE * 1) + (item.NOVIEMBRE * 1) + (item.DICIEMBRE * 1);
            edejec2020_ene_jun = (item.ENERO * 1) + (item.FEBRERO * 1) + (item.MARZO * 1) + (item.ABRIL * 1) + (item.MAYO * 1) + (item.JUNIO * 1);
            
            avance_2020 = ((edejec2020_ene_jun/edeje2020) * 100).toFixed(2); //Avance 2020
            avance_ejec_2021 = ((edeje2021/edppto2021) * 100).toFixed(2); //Avance EJEC 2021
            var_eje_jun_2020_2021 = (((edeje2021/edejec2020_ene_jun)-1) * 100).toFixed(0); // VAR ENE-JUN 2020-2021
            saldo_2021 = (( (edeje2021 + edcom2021) / edppto2021 ) * 100).toFixed(0); // SALDO 2021 %

            if(avance_2020 == '-Infinity') avance_2020 = ''
            if(avance_ejec_2021 == '-Infinity') avance_ejec_2021 = ''
            if(var_eje_jun_2020_2021 == '-Infinity') var_eje_jun_2020_2021 = ''
            if(saldo_2021 == '-Infinity') saldo_2021 = ''

            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_1_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_2_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.Nivel_4_DESC } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.ENERO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.FEBRERO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.MARZO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.ABRIL } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.MAYO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.JUNIO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.JULIO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.AGOSTO } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.SEPTIEMBRE } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.OCTUBRE } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.NOVIEMBRE } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ item.DICIEMBRE } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ edeje2020.toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ edppto2021.toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ edejec2020_ene_jun.toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ avance_2020 }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ edeje2021.toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ avance_ejec_2021 }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ edcom2021.toFixed(3)} </td>\
                        <td class="text-center" style="padding-right:30px"> ${ (edeje2021 + edcom2021).toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ (edejec2020_ene_jun-edeje2021).toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ var_eje_jun_2020_2021 }% </td>\
                        <td class="text-center" style="padding-right:30px"> ${ (edppto2021 - (edeje2021 + edcom2021)).toFixed(3) } </td>\
                        <td class="text-center" style="padding-right:30px"> ${ saldo_2021 }% </td>\
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
            let cabeceras = "CONCEPTO¦FAMILIA DE PARTIDA¦DETALLE¦ENERO¦FEBRERO¦MARZO¦ABRIL¦MAYO¦JUNIO¦JULIO¦AGOSTO¦SEPTIEMBRE¦OCTUBRE¦NOVIEMBRE¦DICIEMBRE¦EJEC2020 ENEDIC¦PPTO2021 ENEDIC¦EJEC2020 ENEJUN¦AVANCE 2020¦EJEC2021 ENEJUN¦AVANCE EJEC 2021¦COMPROMISOS 2021¦EJEC+COMP 2021¦VAR ENE-JUN 2020-2021/Monto¦VAR ENE-JUN 2020-2021/%¦SALDO 2021/Monto¦SALDO 2021/%".split("¦");                                                                        
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
            // dataArray = [{ cells }]
            dataArray.push({ cells: cells })

             
            // $.each(data.data, function (i, item) {
            //       cells = [] 
            //       cells.push({ value: item.Nivel_1_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.Nivel_2_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.Nivel_4_DESC, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.ENERO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.FEBRERO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.MARZO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.ABRIL, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.MAYO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.JUNIO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.JULIO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.AGOSTO, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.SEPTIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.OCTUBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.NOVIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
            //       cells.push({ value: item.DICIEMBRE, fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  
            //       dataArray.push({ cells: cells })
            // })
            let arrayTabla = tableData.rows().data()
            $.each(arrayTabla , function (i, item) {
                  cells = [] 
                  cells.push({ value: item[0], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[1], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[2], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[3], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[4], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[5], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[6], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[7], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[8], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[9], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[10], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[11], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[12], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[13], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[14], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[15], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[16], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[17], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[18], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[19], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[20], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[21], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[22], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[23], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[24], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[25], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  cells.push({ value: item[26], fontSize: 10, borderBottom: { color: "#000000", size: 1 }, borderLeft: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 } })
                  

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
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 150 },
                              { width: 250 },
                              { width: 250 },
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