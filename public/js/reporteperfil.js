let combos;
$(async function() {
      await configSelects();
      await configData()
      configHelp();
      configAction();
});

async function configSelects() {
      try {
            $('#loading').show()
            const response = await getLists();
            $('#loading').hide()
      } catch (error) {
            $('#loading').hide()
      }
}

async function configData() {
      $("#tbody").empty()
      let text = '';
      $.each(combos.reporteperfil, function (i, item) {
            text += `<tr>\
                        <td class="text-center" style="padding-right:30px"> ${item.Perfil} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Unidad} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Actividad} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Sede} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CodReferencia} </td>\
                        <td class="text-center"  style="padding-right:30px">\
                                    <div class="form-group">\
                                          <button type="button" class="btn btn-outline-danger btn-sm delete" data-id="${item.id}"><i class="fas fa-minus-circle"></i>  </button>\
                                    </div>\
                              </td>\
                     </tr>`;
            
      });            
      configTable(text);
      configActionTable();
}

function getLists() {
      return new Promise ( (resolve, reject) => {
            $.ajax({
                  url: '/perfil_get',
                  type: 'post',
                  dataType: 'json',
                  data: {
                        "_token": tokenLaravel
                  },
                  success: function(resp) {
                        combos = (resp)
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

function configTableHelp(text) {
      $('#dataTableHelp').DataTable().clear();
      $('#dataTableHelp').DataTable().destroy();
      $("#tbodyhelp").append(text)
      $('#dataTableHelp').DataTable({
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
            "columnDefs": [
                  { "width": "20%", "targets": 0 },
                  { "width": "45%", "targets": 0 },
                  { "width": "45%", "targets": 0 }
            ],
            "initComplete": function () {
                  dataTableHelp.style.width = '100%';
                  dataTableHelp.style.fontSize = 'small'
            },
            "drawCallback": function( settings ) {
                  configActionTableHelp()
            }
      })
}

function configHelp() {
      $('.help').click(function() {
            let val = this.dataset.help;
            let arrHelp = [];
            switch (val) {
                  case 'unidad':
                        arrHelp = combos.unidad;
                        break;
                  case 'actividad':
                        arrHelp = combos.actividad;
                    break;
                  case 'sede':
                        arrHelp = combos.sede;
                        break;
                  case 'codreferencia':
                        arrHelp = combos.referencia;
                        break;
                  default:
                        arrHelp = combos.unidad;
                        break;
            }
            $("#tbodyhelp").empty()
            let text = '';

            text += `<tr>\
                        <td class="text-center"  style="padding-right:30px">\
                              <div class="form-group">\
                                    <button type="button" class="btn btn-outline-primary btn-sm helpselec" data-value="TODOS"><i class="fas fa-check-circle"></i>  </button>\
                              </div>\
                        </td>\
                        <td class="text-left" style="padding-right:30px"> TODOS </td>\
                        <td class="text-left" style="padding-right:30px"> TODOS </td>\
                        </tr>`;

            $.each(arrHelp, function (i, item) {
                  text += `<tr>\
                              <td class="text-center"  style="padding-right:30px">\
                                    <div class="form-group">\
                                          <button type="button" class="btn btn-outline-primary btn-sm helpselec" data-value="${item.cod}"><i class="fas fa-check-circle"></i>  </button>\
                                    </div>\
                              </td>\
                              <td class="text-left" style="padding-right:30px"> ${item.cod} </td>\
                              <td class="text-left" style="padding-right:30px"> ${item.desc} </td>\
                           </tr>`;
                  
            });            
            configTableHelp(text);
            configActionTableHelp();
            $('#typehelp').val(val)
            $("#exampleModal").modal('show');
        });
}

function configActionTableHelp(){
      $('.helpselec').click(function() {
            let type = $('#typehelp').val()
            let val = this.dataset.value
            switch (type) {
                  case 'unidad':
                        txtunidad.value = val
                        break;
                  case 'actividad':
                        txtactividad.value = val
                    break;
                  case 'sede':
                        txtsede.value = val
                        break;
                  case 'codreferencia':
                        txtreferencia.value = val
                        break;
                  default:
                        txtunidad.value = val
                        break;
            }
            $("#exampleModal").modal('hide');
      })
}

function configAction() {
      $('#btnAdd').click( async function() {
            if( cmbperfil.value != '0' && txtunidad.value.trim() != '' && txtactividad.value.trim() != '' && txtsede.value.trim() != '' && txtreferencia.value.trim() != '') {
                  try {
                        $('#loading').show()
                        let row = `${cmbperfil.value}¦${txtunidad.value}¦${txtactividad.value}¦${txtsede.value}¦${txtreferencia.value}`;
                        await saveData(row);
                        await configSelects();
                        configData()
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
                              await configSelects();
                              configData()

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
                  url: '/perfil_save',
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
                  url: '/perfil_delete',
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


