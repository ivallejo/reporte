let arrMaestros = [];
let arrHistorial = [];
var tableData;
let archivo_numero;
let archivo_ano;
$(function () {
    configFile();
    configUpload();
    configUpdated();
});

function configFile() {
    $("#file").customFile({
        type: "all",
        allowed: ["xlsx"],
        multiple: true,
        maxMB: 20,
        maxFiles: 10,
        maxKBperFile: 20000,
        messages: {
            errorType: "Este archivo no est&aacute; permitido",
            errorMaxFiles: "Solo Puede Subir un M&aacute;ximo de 10 archivos",
            errorMaxMB: "Solo Puede Subir un M&aacute;ximo de 8mb",
        },
        popup: {
            active: true, // false if you don’t like popup messages
            autoclose: true, // or false
            delay: 10000, // delay for close (in miliseconds), of course, if autoclose is set true
        },
        filePicker: "<p><h3>Adjuntar Excel</h3></p>" + "<p>aqu&iacute;</p>",
        callbacks: {
            onSuccess: function (item, callback) {
                let file_name = item.file.name
                archivo_numero = file_name[0]

                let i_file_name_without_extension = file_name.indexOf('.xlsx')
                let file_name_without_extension = file_name.substring(0, i_file_name_without_extension)
                archivo_ano = file_name_without_extension.substring(file_name_without_extension.length - 4)

                console.log('archivo_numero', archivo_numero)
                console.log('archivo_ano', archivo_ano)

                try {
                    $("#loading").show();

                    let files = item.fileList,
                        f = files[0];
                    let reader = new FileReader();
                    let arrData = [];
                    let obj;

                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: "array" });
                        let trama = "";
                        try {
                            let XL_row_object =
                                XLSX.utils.sheet_to_row_object_array(
                                    workbook.Sheets[workbook.SheetNames[0]],
                                    { range: 3, raw: true }
                                );
                            // wbk = XL_row_object;
                            // debugger
                            XL_row_object.forEach((row) => {
                                if (row.Ledger == undefined) {
                                    let elements =
                                        document.querySelectorAll(
                                            ".cif-file-row"
                                        );
                                    elements[elements.length - 1].remove();
                                    throw BreakException;
                                }
                                item = {
                                    Ledger:
                                        row.Ledger == undefined
                                            ? ""
                                            : row.Ledger,
                                    Presupuesto:
                                        row.Presupuesto == undefined
                                            ? ""
                                            : row.Presupuesto,
                                    Periodo_Presupuestal:
                                        row["Periodo Presupuestal"] == undefined
                                            ? ""
                                            : row["Periodo Presupuestal"],
                                    Nivel_0_Cod:
                                        row["Nivel 0 Cod"] == undefined
                                            ? ""
                                            : row["Nivel 0 Cod"],
                                    Nivel_1_COD:
                                        row["Nivel 1 COD"] == undefined
                                            ? ""
                                            : row["Nivel 1 COD"],
                                    Nivel_1_DESC:
                                        row["Nivel 1 DESC"] == undefined
                                            ? ""
                                            : row["Nivel 1 DESC"],
                                    Nivel_2_COD:
                                        row["Nivel 2 COD"] == undefined
                                            ? ""
                                            : row["Nivel 2 COD"],
                                    Nivel_2_DESC:
                                        row["Nivel 2 DESC"] == undefined
                                            ? ""
                                            : row["Nivel 2 DESC"],
                                    Nivel_4_COD:
                                        row["Nivel 4 COD"] == undefined
                                            ? ""
                                            : row["Nivel 4 COD"],
                                    Nivel_4_DESC:
                                        row["Nivel 4 DESC"] == undefined
                                            ? ""
                                            : row["Nivel 4 DESC"],
                                    Mes_Contable_ID_MES:
                                        row["Mes Contable ID_MES"] == undefined
                                            ? ""
                                            : row["Mes Contable ID_MES"],
                                    Mes_Contable_mesN:
                                        row["Mes Contable mesN"] == undefined
                                            ? ""
                                            : row["Mes Contable mesN"],
                                    Fecha_Contable:
                                        row["Fecha Contable"] == undefined
                                            ? ""
                                            : row["Fecha Contable"],
                                    Año_Fiscal:
                                        row["Año Fiscal"] == undefined
                                            ? ""
                                            : row["Año Fiscal"],
                                    Moneda:
                                        row["Moneda"] == undefined
                                            ? ""
                                            : row["Moneda"],
                                    Unidad_COD:
                                        row["Unidad COD"] == undefined
                                            ? ""
                                            : row["Unidad COD"],
                                    Unidad_DESC:
                                        row["Unidad DESC"] == undefined
                                            ? ""
                                            : row["Unidad DESC"],
                                    Actividad_COD:
                                        row["Actividad COD"] == undefined
                                            ? ""
                                            : row["Actividad COD"],
                                    Actividad_DESC:
                                        row["Actividad DESC"] == undefined
                                            ? ""
                                            : row["Actividad DESC"],
                                    Sede_COD:
                                        row["Sede COD"] == undefined
                                            ? ""
                                            : row["Sede COD"],
                                    Sede_DESC:
                                        row["Sede DESC"] == undefined
                                            ? ""
                                            : row["Sede DESC"],
                                    Referencia_COD:
                                        row["Referencia COD"] == undefined
                                            ? ""
                                            : row["Referencia COD"],
                                    Referencia_DESC:
                                        row["Referencia DESC"] == undefined
                                            ? ""
                                            : row["Referencia DESC"],
                                    Linea_COD:
                                        row["Linea COD"] == undefined
                                            ? ""
                                            : row["Linea COD"],
                                    Linea_DESC:
                                        row["Linea DESC"] == undefined
                                            ? ""
                                            : row["Linea DESC"],
                                    Unidad_Negocio_PC_COD:
                                        row["Unidad Negocio PC COD"] ==
                                        undefined
                                            ? ""
                                            : row["Unidad Negocio PC COD"],
                                    Unidad_Negocio_PC_DESC:
                                        row["Unidad Negocio PC DESC"] ==
                                        undefined
                                            ? ""
                                            : row["Unidad Negocio PC DESC"],
                                    Proyecto_COD:
                                        row["Proyecto COD"] == undefined
                                            ? ""
                                            : row["Proyecto COD"],
                                    Proyecto_DESC:
                                        row["Proyecto DESC"] == undefined
                                            ? ""
                                            : row["Proyecto DESC"],
                                    Actividad_Proyecto_COD:
                                        row["Actividad Proyecto COD"] ==
                                        undefined
                                            ? ""
                                            : row["Actividad Proyecto COD"],
                                    Actividad_Proyecto_DESC:
                                        row["Actividad Proyecto DESC"] ==
                                        undefined
                                            ? ""
                                            : row["Actividad Proyecto DESC"],
                                    Cd_Fondo_COD:
                                        row["Cd Fondo COD"] == undefined
                                            ? ""
                                            : row["Cd Fondo COD"],
                                    Cd_Fondo_DESC:
                                        row["Cd Fondo DESC"] == undefined
                                            ? ""
                                            : row["Cd Fondo DESC"],
                                    Cuenta_COD:
                                        row["Cuenta COD"] == undefined
                                            ? ""
                                            : row["Cuenta COD"],
                                    Cuenta_DESC:
                                        row["Cuenta DESC"] == undefined
                                            ? ""
                                            : row["Cuenta DESC"],
                                    Glosa:
                                        row["Glosa"] == undefined
                                            ? ""
                                            : row["Glosa"],
                                    Desc_Origen_Doc:
                                        row["Desc. Origen Doc"] == undefined
                                            ? ""
                                            : row["Desc. Origen Doc"],
                                    Desc_Nro_Doc:
                                        row["Desc. Nro Doc"] == undefined
                                            ? ""
                                            : row["Desc. Nro Doc"],
                                    Desc_Tipo_Doc:
                                        row["Desc. Tipo Doc"] == undefined
                                            ? ""
                                            : row["Desc. Tipo Doc"],
                                    Registrador:
                                        row["Registrador"] == undefined
                                            ? ""
                                            : row["Registrador"],
                                    CliPro_Codigo:
                                        row[" Cli/Pro Codigo"] == undefined
                                            ? ""
                                            : row[" Cli/Pro Codigo"],
                                    CliPro_Nombre:
                                        row[" Cli/Pro Nombre"] == undefined
                                            ? ""
                                            : row[" Cli/Pro Nombre"],
                                    CliPro_Tipo_Doc:
                                        row[" Cli/Pro Tipo Doc"] == undefined
                                            ? ""
                                            : row[" Cli/Pro Tipo Doc"],
                                    CliPro_Númer_Doc:
                                        row[" Cli/Pro Número Doc"] == undefined
                                            ? ""
                                            : row[" Cli/Pro Número Doc"],
                                    Fecha_Factura:
                                        row["Fecha Factura"] == undefined
                                            ? ""
                                            : row["Fecha Factura"],
                                    Documento_Relacionado:
                                        row["Documento Relacionado"] ==
                                        undefined
                                            ? ""
                                            : row["Documento Relacionado"],
                                    Moneda_Origen:
                                        row["Moneda Origen"] == undefined
                                            ? ""
                                            : row["Moneda Origen"],
                                    Fecha_Pago:
                                        row["Fecha Pago"] == undefined
                                            ? ""
                                            : row["Fecha Pago"],
                                    Igv_Tipo_Uso:
                                        row["Igv Tipo Uso"] == undefined
                                            ? ""
                                            : row["Igv Tipo Uso"],
                                    Importe2:
                                        row["Importe2"] == undefined
                                            ? 0
                                            : row["Importe2"],
                                    Importe_Dolares2:
                                        row["Importe_Dolares2"] == undefined
                                            ? 0
                                            : row["Importe_Dolares2"],
                                };
                                trama += `${configTrama(item)}¥`;
                            });
                            arrMaestros = []
                            arrMaestros.push(trama);
                            Swal.fire({
                                title: "Genial!",
                                text: "Archivo cargado satisfactoriamente.",
                                confirmButtonColor: "#4650dd",
                            });
                            $("#loading").hide();
                        } catch (error) {
                            $("#loading").hide();
                            Swal.fire({
                                title: "Atención!",
                                text: "El documento no tiene el formato correcto.",
                                confirmButtonColor: "#4650dd",
                            });
                        }
                    };
                    reader.readAsArrayBuffer(f);
                } catch (ex) {
                    $("#loading").hide();
                }
            },
        },
        beforeRemove: function (item) {
            console.log("You are removing " + file.name);
        },
    });
}

function configUpload() {
    $("#upload").click(async function () {
        if (arrMaestros.length != 0) {
            $("#loading").show();
            let data = "";
            let response;
            for (r = 0; r <= arrMaestros.length - 1; ++r) {
                data = arrMaestros[r];
                // debugger
                let _data = archivo_numero + "─" + archivo_ano + "─" + data;
                console.log('_data', _data)
                response = await sendData(_data);
                if (!response.success) {
                    // Swal.fire({
                    //       title:'Atención!',
                    //       text:'Error al cargar el Excel, por favor comuniquese con el administrador del sistema.',
                    //       confirmButtonColor: '#4650dd'
                    // })
                    Swal.fire({
                        title: "Atencion!",
                        text: "Actualice la información observada.",
                        confirmButtonColor: "#4650dd",
                    });
                    if (response.data.length != 0) {
                        showTable(response.data);
                    }
                    $("#loading").hide();
                    $("#divupdate").show();
                    resetInpuFile();
                    break;
                } else {
                    if (r == arrMaestros.length - 1) {
                        Swal.fire({
                            title: "Genial!",
                            text: "Los archivos han sido procesados de forma satisfactoria.",
                            confirmButtonColor: "#4650dd",
                        });
                        $("#loading").hide();
                        arrMaestros = [];
                        resetInpuFile();
                    }
                }
            }
        } else {
            Swal.fire({
                title: "Atención!",
                text: "Adjunte el Excel a importar.",
                confirmButtonColor: "#4650dd",
            });
        }
    });
}

function sendData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/saveData",
            type: "post",
            dataType: "json",
            data: {
                _token: tokenLaravel,
                data,
            },
            success: function (resp) {
                resolve(resp);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(XMLHttpRequest.responseText);
            },
        });
    });
}

function configTrama(item) {
    return `${item.Ledger}¦${item.Presupuesto}¦${item.Periodo_Presupuestal}¦${item.Nivel_0_Cod}¦${item.Nivel_1_COD}¦${item.Nivel_1_DESC}¦${item.Nivel_2_COD}¦${item.Nivel_2_DESC}¦${item.Nivel_4_COD}¦${item.Nivel_4_DESC}¦${item.Mes_Contable_ID_MES}¦${item.Mes_Contable_mesN}¦${item.Fecha_Contable}¦${item.Año_Fiscal}¦${item.Moneda}¦${item.Unidad_COD}¦${item.Unidad_DESC}¦${item.Actividad_COD}¦${item.Actividad_DESC}¦${item.Sede_COD}¦${item.Sede_DESC}¦${item.Referencia_COD}¦${item.Referencia_DESC}¦${item.Linea_COD}¦${item.Linea_DESC}¦${item.Unidad_Negocio_PC_COD}¦${item.Unidad_Negocio_PC_DESC}¦${item.Proyecto_COD}¦${item.Proyecto_DESC}¦${item.Actividad_Proyecto_COD}¦${item.Actividad_Proyecto_DESC}¦${item.Cd_Fondo_COD}¦${item.Cd_Fondo_DESC}¦${item.Cuenta_COD}¦${item.Cuenta_DESC}¦${item.Glosa}¦${item.Desc_Origen_Doc}¦${item.Desc_Nro_Doc}¦${item.Desc_Tipo_Doc}¦${item.Registrador}¦${item.CliPro_Codigo}¦${item.CliPro_Nombre}¦${item.CliPro_Tipo_Doc}¦${item.CliPro_Númer_Doc}¦${item.Fecha_Factura}¦${item.Documento_Relacionado}¦${item.Moneda_Origen}¦${item.Fecha_Pago}¦${item.Igv_Tipo_Uso}¦${item.Importe2}¦${item.Importe_Dolares2}`;
}

function configTramaUpdated(item) {
    return `${item.Ledger}¦${item.Presupuesto}¦${item.Periodo_Presupuestal}¦${item.Nivel_0_Cod}¦${item.Nivel_1_COD}¦${item.Nivel_1_DESC}¦${item.Nivel_2_COD}¦${item.Nivel_2_DESC}¦${item.Nivel_4_COD}¦${item.Nivel_4_DESC}¦${item.Mes_Contable_ID_MES}¦${item.Mes_Contable_mesN}¦${item.Fecha_Contable}¦${item.Año_Fiscal}¦${item.Moneda}¦${item.Unidad_COD}¦${item.Unidad_DESC}¦${item.Actividad_COD}¦${item.Actividad_DESC}¦${item.Sede_COD}¦${item.Sede_DESC}¦${item.Referencia_COD}¦${item.Referencia_DESC}¦${item.Linea_COD}¦${item.Linea_DESC}¦${item.Unidad_Negocio_PC_COD}¦${item.Unidad_Negocio_PC_DESC}¦${item.Proyecto_COD}¦${item.Proyecto_DESC}¦${item.Actividad_Proyecto_COD}¦${item.Actividad_Proyecto_DESC}¦${item.Cd_Fondo_COD}¦${item.Cd_Fondo_DESC}¦${item.Cuenta_COD}¦${item.Cuenta_DESC}¦${item.Glosa}¦${item.Desc_Origen_Doc}¦${item.Desc_Nro_Doc}¦${item.Desc_Tipo_Doc}¦${item.Registrador}¦${item.CliPro_Codigo}¦${item.CliPro_Nombre}¦${item.CliPro_Tipo_Doc}¦${item.CliPro_Númer_Doc}¦${item.Fecha_Factura}¦${item.Documento_Relacionado}¦${item.Moneda_Origen}¦${item.Fecha_Pago}¦${item.Igv_Tipo_Uso}¦${item.Importe2}¦${item.Importe_Dolares2}¦${item.CodCategoria}¦${item.Direccion}¦${item.Area}¦${item.TipoActividad}¦${item.Criterio}¦${item.Flujo}¦${item.ImporteS}¦${item.ImporteUSD}¦${item.Categoria}¦${item.id}`;
}

function resetInpuFile() {
    $("#divFile").empty();
    $("#divFile").append('<input name="file" id="file" multiple="multiple">');
    configFile();
}

function showTable(data) {
    $("#tbody").empty();
    let text = "";
    let index = 0;
    $.each(data, function (i, item) {
        text += `<tr  data-row="${index}" id="${item.id}">\
                        <td class="text-center" style="padding-right:30px"> ${item.Ledger} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Presupuesto} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Periodo_Presupuestal} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_0_Cod} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_1_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_1_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_2_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_2_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_4_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Nivel_4_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Mes_Contable_ID_MES} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Mes_Contable_mesN} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Fecha_Contable} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Año_Fiscal} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Moneda} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Unidad_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Unidad_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Actividad_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Actividad_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Sede_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Sede_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Referencia_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Referencia_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Linea_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Linea_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Unidad_Negocio_PC_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Unidad_Negocio_PC_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Proyecto_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Proyecto_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Actividad_Proyecto_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Actividad_Proyecto_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Cd_Fondo_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Cd_Fondo_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Cuenta_COD} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Cuenta_DESC} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Glosa} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Desc_Origen_Doc} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Desc_Nro_Doc} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Desc_Tipo_Doc} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Registrador} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CliPro_Codigo} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CliPro_Nombre} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CliPro_Tipo_Doc} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.CliPro_Númer_Doc} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Fecha_Factura} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Documento_Relacionado} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Moneda_Origen} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Fecha_Pago} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Igv_Tipo_Uso} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Importe2} </td>\
                        <td class="text-center" style="padding-right:30px"> ${item.Importe_Dolares2} </td>\
                        <td class="text-center edit-row" data-label="Cod. Categoría" data-column="51" style="padding-right:30px"> ${item.CodCategoria} </td>\
                        <td class="text-center edit-row" data-label="Direccion" data-column="52" style="padding-right:30px"> ${item.Direccion} </td>\
                        <td class="text-center edit-row" data-label="Área" data-column="53" style="padding-right:30px"> ${item.Area} </td>\
                        <td class="text-center edit-row" data-label="Tipo Actividad" data-column="54" style="padding-right:30px"> ${item.TipoActividad} </td>\
                        <td class="text-center edit-row" data-label="Criterio" data-column="55" style="padding-right:30px"> ${item.Criterio} </td>\
                        <td class="text-center edit-row" data-label="Flujo" data-column="56" style="padding-right:30px"> ${item.Flujo} </td>\
                        <td class="text-center edit-row" data-label="Importe S/." data-column="57" style="padding-right:30px"> ${item.ImporteS} </td>\
                        <td class="text-center edit-row" data-label="Importe USD" data-column="58" style="padding-right:30px"> ${item.ImporteUSD} </td>\
                        <td class="text-center edit-row" data-label="Categoria" data-column="59" style="padding-right:30px"> ${item.Categoria} </td>\
                     </tr>`;
        index++;
    });
    $("#dataTable").DataTable().clear();
    $("#dataTable").DataTable().destroy();
    $("#tbody").append(text);
    editTable();
    tableData = $("#dataTable").DataTable({
        order: [[0, "desc"]],
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty:
                "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            oAria: {
                sSortAscending:
                    ": Activar para ordenar la columna de manera ascendente",
                sSortDescending:
                    ": Activar para ordenar la columna de manera descendente",
            },
        },
        drawCallback: function (settings) {
            // configActionTable()
        },
    });
}

function editTable() {
    $(".edit-row").click(async function () {
        // debugger
        let td = this;
        let _row = td.parentElement.dataset.row;
        let _column = td.dataset.column;
        let _label = td.dataset.label;
        let _text = td.innerText;

        $("#hddLabel").val(_label);
        $("#hddValue").val(_text);
        $("#hddColumn").val(_column);
        $("#hddRow").val(_row);
        $("#lblValue").text(_label);
        $("#txtValue").val(_text);
        $("#exampleModal").modal("show");

        //       debugger
        // td.innerText = ''
        //       let input = document.createElement("input");
        //       input.type = "text";
        //       input.value = text;
        //       input.className = "form-control";
        //       input.addEventListener("focusout", function() {
        //             td.innerText = this.value;
        //             console.log('perdio foco')
        //       });
        //       td.appendChild(input);
        //       input.focus();
    });
}

function sendDataUpdate(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/updateData",
            type: "post",
            dataType: "json",
            data: {
                _token: tokenLaravel,
                data,
            },
            success: function (resp) {
                resolve(resp);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(XMLHttpRequest.responseText);
            },
        });
    });
}

function configUpdated() {
    $("#add").click(async function () {
        let trama = "";
        $("table > tbody  > tr").each(function (index, tr) {
            tr.cells[0].innerHTML;
            item = {
                id: tr.id,
                Ledger: tr.cells[0].innerHTML.trim(),
                Presupuesto: tr.cells[1].innerHTML.trim(),
                Periodo_Presupuestal: tr.cells[2].innerHTML.trim(),
                Nivel_0_Cod: tr.cells[3].innerHTML.trim(),
                Nivel_1_COD: tr.cells[4].innerHTML.trim(),
                Nivel_1_DESC: tr.cells[5].innerHTML.trim(),
                Nivel_2_COD: tr.cells[6].innerHTML.trim(),
                Nivel_2_DESC: tr.cells[7].innerHTML.trim(),
                Nivel_4_COD: tr.cells[8].innerHTML.trim(),
                Nivel_4_DESC: tr.cells[9].innerHTML.trim(),
                Mes_Contable_ID_MES: tr.cells[10].innerHTML.trim(),
                Mes_Contable_mesN: tr.cells[11].innerHTML.trim(),
                Fecha_Contable: tr.cells[12].innerHTML.trim(),
                Año_Fiscal: tr.cells[13].innerHTML.trim(),
                Moneda: tr.cells[14].innerHTML.trim(),
                Unidad_COD: tr.cells[15].innerHTML.trim(),
                Unidad_DESC: tr.cells[16].innerHTML.trim(),
                Actividad_COD: tr.cells[17].innerHTML.trim(),
                Actividad_DESC: tr.cells[18].innerHTML.trim(),
                Sede_COD: tr.cells[19].innerHTML.trim(),
                Sede_DESC: tr.cells[20].innerHTML.trim(),
                Referencia_COD: tr.cells[21].innerHTML.trim(),
                Referencia_DESC: tr.cells[22].innerHTML.trim(),
                Linea_COD: tr.cells[23].innerHTML.trim(),
                Linea_DESC: tr.cells[24].innerHTML.trim(),
                Unidad_Negocio_PC_COD: tr.cells[25].innerHTML.trim(),
                Unidad_Negocio_PC_DESC: tr.cells[26].innerHTML.trim(),
                Proyecto_COD: tr.cells[27].innerHTML.trim(),
                Proyecto_DESC: tr.cells[28].innerHTML.trim(),
                Actividad_Proyecto_COD: tr.cells[29].innerHTML.trim(),
                Actividad_Proyecto_DESC: tr.cells[30].innerHTML.trim(),
                Cd_Fondo_COD: tr.cells[31].innerHTML.trim(),
                Cd_Fondo_DESC: tr.cells[32].innerHTML.trim(),
                Cuenta_COD: tr.cells[33].innerHTML.trim(),
                Cuenta_DESC: tr.cells[34].innerHTML.trim(),
                Glosa: tr.cells[35].innerHTML.trim(),
                Desc_Origen_Doc: tr.cells[36].innerHTML.trim(),
                Desc_Nro_Doc: tr.cells[37].innerHTML.trim(),
                Desc_Tipo_Doc: tr.cells[38].innerHTML.trim(),
                Registrador: tr.cells[39].innerHTML.trim(),
                CliPro_Codigo: tr.cells[40].innerHTML.trim(),
                CliPro_Nombre: tr.cells[41].innerHTML.trim(),
                CliPro_Tipo_Doc: tr.cells[42].innerHTML.trim(),
                CliPro_Númer_Doc: tr.cells[43].innerHTML.trim(),
                Fecha_Factura: tr.cells[44].innerHTML.trim(),
                Documento_Relacionado: tr.cells[45].innerHTML.trim(),
                Moneda_Origen: tr.cells[46].innerHTML.trim(),
                Fecha_Pago: tr.cells[47].innerHTML.trim(),
                Igv_Tipo_Uso: tr.cells[48].innerHTML.trim(),
                Importe2: tr.cells[49].innerHTML.trim(),
                Importe_Dolares2: tr.cells[50].innerHTML.trim(),
                CodCategoria: tr.cells[51].innerHTML.trim(),
                Direccion: tr.cells[52].innerHTML.trim(),
                Area: tr.cells[53].innerHTML.trim(),
                TipoActividad: tr.cells[54].innerHTML.trim(),
                Criterio: tr.cells[55].innerHTML.trim(),
                Flujo: tr.cells[56].innerHTML.trim(),
                ImporteS: tr.cells[57].innerHTML.trim(),
                ImporteUSD: tr.cells[58].innerHTML.trim(),
                Categoria: tr.cells[59].innerHTML.trim(),
            };
            trama += `${configTramaUpdated(item)}¥`;
        });
        trama = trama.substring(0, trama.length - 1);
        $("#loading").show();
        response = await sendDataUpdate(trama);
        if (!response.success) {
            Swal.fire({
                title: "Atencion!",
                text: "Actualice la información observada.",
                confirmButtonColor: "#4650dd",
            });
            if (response.data.length != 0) {
                showTable(response.data);
            }
            $("#loading").hide();
            $("#divupdate").show();
            resetInpuFile();
        } else {
            Swal.fire({
                title: "Genial!",
                text: "Los archivos han sido procesados de forma satisfactoria.",
                confirmButtonColor: "#4650dd",
            });
            $("#loading").hide();
            $("#divupdate").hide();
            arrMaestros = [];
            resetInpuFile();
        }
    });

    $("#omitir").click(async function () {
        $('#divupdate').hide()
    })
}

function updateRow() {
    let _text = $("#txtValue").val();
    let _column = $("#hddColumn").val();
    let _row = $("#hddRow").val();
    tableData.cell({ row: _row * 1, column: _column * 1 }).data(_text);
    $("#exampleModal").modal("hide");
}
