
$(async function() {
      const data = await configSelects();
      const text = await configData(data);
      configTable(text);
      configActionTable();
      configAction();
});

async function configSelects() {
      try {
            $('#loading').show()
            const data = await getLists();
            $('#loading').hide()
            return data;
      } catch (error) {
            $('#loading').hide()
      }
}

async function configData(data) {
      $("#tbody").empty()
      let text = '';
      $.each(data.data, function (i, item) {
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${item.Procedencia} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Cartera} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.TipoPrograma} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Detalle} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.NombrePrograma} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Chartfields} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CodUnidad} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CodNivel4} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.ChartfieldsPartida} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Status} </td>\
                        <td class="text-center"  style="padding-right:30px">\
                                    <div class="form-group">\
                                          <button type="button" class="btn btn-outline-danger btn-sm delete" data-id="${item.id}"><i class="fas fa-minus-circle"></i>  </button>\
                                    </div>\
                              </td>\
                     </tr>`;
            
      }); 
      return text;
}

function getLists() {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/proyeccioningresos_get',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel
                  },
                  success: function(resp) {
                        resolve(resp);
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Error')
                        reject(XMLHttpRequest.responseText)
                  }
            });
      });
}

function configTable(text) {
      $('#dataTable').DataTable().clear();
      $('#dataTable').DataTable().destroy();
      $("#tbody").append(text)
      $('#dataTable').DataTable({
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
                  configActionTable()
            }
      })
}

function configAction() {
      $('#btnAdd').click( async function() {
            if( txtprocedencia.value != '' && txtcartera.value.trim() != '' && txttipoPrograma.value.trim() != '' && txtdetalle.value.trim() != '' && txtnombrePrograma.value.trim() != '' && txtchartfields.value.trim() != '' && txtcodunidad.value.trim() != '' && txtcodnivel4.value.trim() != '') {
                  try {
                        $('#loading').show()
                        let row = `${txtprocedencia.value}¦${txtcartera.value}¦${txttipoPrograma.value}¦${txtdetalle.value}¦${txtnombrePrograma.value}¦${txtchartfields.value}¦${txtcodunidad.value}¦${txtcodnivel4.value}`;
                        await saveData(row);
                        // ------
                        const data = await configSelects();
                        const text = await configData(data);
                        configTable(text);
                        configActionTable();
                        // ------
                        Swal.fire(
                              'Registro Satisfactorio!',
                              'Perfil registrado satisfactoriamente.'
                        )
                        $('#loading').hide()
                  } catch (error) {
                        alert(error)
                        $('#loading').hide() 
                  }
            } else {
                  Swal.fire({
                        title:'Atención!',
                        text:'Ingrese toda la información solicitada.',
                        confirmButtonColor: '#4650dd'
                  })
            }
      })
}

function configActionTable() {
      $('.delete').click( function() {
            const idRow = this.dataset.id;
            Swal.fire({
                  title: 'Esta Seguro de eliminar el registo?',
                  text: "No podr\u00E1 revertir la acci\u00F3n!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#4650dd',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'S\u00ED, Eliminar!',
                  cancelButtonText: 'Cancelar'
            }).then( async (result) => {
                  if (result.value) {
                        try {
                              $('#loading').show();
                              await deleteData(idRow);
                             // ------
                              const data = await configSelects();
                              const text = await configData(data);
                              configTable(text);
                              configActionTable();
                              // ------
                              Swal.fire({
                                    title:'Registro Eliminado!',
                                    text:'Registro eliminado satisfactoriamente.',
                                    confirmButtonColor: '#4650dd'
                              })
                              $('#loading').hide();
                        } catch (error) {
                              $('#loading').hide();
                        }
                  }
            })  
      })
}


function saveData(data) {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/proyeccioningresos_save',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel,
                        data
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

function deleteData(id) {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/proyeccioningresos_delete',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel,
                        id
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


