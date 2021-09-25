<?php

namespace App\Http\Controllers;

use App\Reporte;
use App\ReporteAgrupador;
use App\ReporteCategorizacion;
use Illuminate\Http\Request;
use DB;

class ReporteController extends Controller
{
    //
    public function index()
    {
        return view('reporte.index');
    }

    public function save(Request $request){
        set_time_limit(200000);
        $req = $request->all();
        $arrData = $req['data'];
        // dd($request->all());
        $rows = explode('¥', $arrData);
        $colums = [];
        $data_response = [];
        foreach($rows as $row){
            $colums = explode('¦', $row);
            if ( trim($colums[0]) != '' && trim($colums[0]) != 'Total') {

                if ( is_numeric(trim($colums[49])) && is_numeric(trim($colums[50])) ) {
                    
                    $codCategoria = $colums[15].'.'.$colums[17].'.'.$colums[19].'.'.$colums[21];
                
                    $direccion = "";
                    if( $colums[4] == '1' && substr($colums[17],0,2) == "OR" ){
                        $direccion = "REMUNERACIONES FIJAS";
                    }else {
                        if ( $colums[8] == '6202' || $colums[8] == '9802' ) {
                            $direccion = "ADMINISTRACIÓN Y FINANZAS";
                        } else {
                            $res = ReporteCategorizacion::select('Direccion')->where('Chartfield', $codCategoria)->first();
                            if( $res ) $direccion = $res->Direccion;
                        }
                    }
                    
                    $area = "";
                    if( $colums[4] == '1' && substr($colums[17],0,2) == "OR" ){
                        $area = "REMUNERACIONES FIJAS";
                    }else {
                        if ( $colums[8] == '6202' ) {
                            $area = "PRACTICANTES";
                        } else {
                            if ( $colums[8] == '9802' ) {
                                $area = "RECUPERACIÓN DE CUENTAS POR COBRAR";
                            } else {                        
                                $res = ReporteCategorizacion::select('Area')->where('Chartfield', $codCategoria)->first();
                                if( $res ) $area = $res->Area;
                            }
                        }
                    }
                    
                    $tipoactividad = "";
                    if( $colums[4] == '1' && substr($colums[17],0,2) == "OR" ){
                        $tipoactividad = "REMUNERACIONES FIJAS";
                    }else {
                        if ( $colums[8] == '6202' ) {
                            $tipoactividad = "PRACTICANTES";
                        } else {
                            if ( $colums[8] == '9802' ) {
                                $tipoactividad = "RECUPERACIÓN DE CUENTAS POR COBRAR";
                            } else {                        
                                $res = ReporteCategorizacion::select('TipoActividad')->where('Chartfield', $codCategoria)->first();
                                if( $res ) $tipoactividad = $res->TipoActividad;
                            }
                        }
                    }

                    $categoria = "";
                    $res = ReporteCategorizacion::select('Categoria')->where('Chartfield', $codCategoria)->first();
                    if( $res ) $categoria = $res->Categoria;
                    
                    $criterio = $direccion.'.'.$area.'.'.$tipoactividad;
                    $flujo = ($colums[4] == '9') ? "Ingresos": "Egresos";  
                    
                    $importeS = "";
                    if ( str_contains(trim($colums[0]), 'PPTO') )  $importeS = ($direccion == "NO CONSIDERAR") ? "" : (($colums[0] == "ING_PPTO") ? $colums[49] : ( ((float)$colums[49]) * -1 ));
                    else $importeS = ($direccion == "NO CONSIDERAR") ? "" : (($colums[0] == "ING_PORCOB") ? $colums[49] : ( ((float)$colums[49]) * -1 ));
                    
                    $ImporteUSD = ($criterio == "") ? "0" : (($colums[0] == "ING_PORCOB") ? $colums[50] : ( ((float)$colums[50]) * -1 ));
                    
                    
                    $reporte = array( 
                        'Ledger' =>                 trim($colums[0]),
                        'Presupuesto' =>            trim($colums[1]),
                        'Periodo_Presupuestal' =>   trim($colums[2]),
                        'Nivel_0_Cod' =>            trim($colums[3]),
                        'Nivel_1_COD' =>            trim($colums[4]),
                        'Nivel_1_DESC' =>           trim($colums[5]),
                        'Nivel_2_COD' =>            trim($colums[6]),
                        'Nivel_2_DESC' =>           trim($colums[7]),
                        'Nivel_4_COD' =>            trim($colums[8]),
                        'Nivel_4_DESC' =>           trim($colums[9]),
                        'Mes_Contable_ID_MES' =>    trim($colums[10]),
                        'Mes_Contable_mesN' =>      trim($colums[11]),
                        'Fecha_Contable' =>         trim($colums[12]),
                        'Año_Fiscal' =>             trim($colums[13]),
                        'Moneda' =>                 trim($colums[14]),
                        'Unidad_COD' =>             trim($colums[15]),
                        'Unidad_DESC' =>            trim($colums[16]),
                        'Actividad_COD' =>          trim($colums[17]),
                        'Actividad_DESC' =>         trim($colums[18]),
                        'Sede_COD' =>               trim($colums[19]),
                        'Sede_DESC' =>              trim($colums[20]),
                        'Referencia_COD' =>         trim($colums[21]),
                        'Referencia_DESC' =>        trim($colums[22]),
                        'Linea_COD' =>              trim($colums[23]),
                        'Linea_DESC' =>             trim($colums[24]),
                        'Unidad_Negocio_PC_COD' =>  trim($colums[25]),
                        'Unidad_Negocio_PC_DESC' => trim($colums[26]),
                        'Proyecto_COD' =>           trim($colums[27]),
                        'Proyecto_DESC' =>          trim($colums[28]),
                        'Actividad_Proyecto_COD' => trim($colums[29]),
                        'Actividad_Proyecto_DESC' =>trim($colums[30]),
                        'Cd_Fondo_COD' =>           trim($colums[31]),
                        'Cd_Fondo_DESC' =>          trim($colums[32]),
                        'Cuenta_COD' =>             trim($colums[33]),
                        'Cuenta_DESC' =>            trim($colums[34]),
                        'Glosa' =>                  trim($colums[35]),
                        'Desc_Origen_Doc' =>        trim($colums[36]),
                        'Desc_Nro_Doc' =>           trim($colums[37]),
                        'Desc_Tipo_Doc' =>          trim($colums[38]),
                        'Registrador' =>            trim($colums[39]),
                        'CliPro_Codigo' =>          trim($colums[40]),
                        'CliPro_Nombre' =>          trim($colums[41]),
                        'CliPro_Tipo_Doc' =>        trim($colums[42]),
                        'CliPro_Númer_Doc' =>       trim($colums[43]),
                        'Fecha_Factura' =>          trim($colums[44]),
                        'Documento_Relacionado' =>  trim($colums[45]),
                        'Moneda_Origen' =>          trim($colums[46]),
                        'Fecha_Pago' =>             trim($colums[47]),
                        'Igv_Tipo_Uso' =>           trim($colums[48]),
                        'Importe2' =>               trim($colums[49]),
                        'Importe_Dolares2' =>       trim($colums[50]),
                        'CodCategoria' =>           $codCategoria,
                        'Direccion' =>              $direccion,
                        'Area' =>                   $area,
                        'TipoActividad' =>          $tipoactividad,
                        'Criterio' =>               $criterio,
                        'Flujo' =>                  $flujo,
                        'ImporteS' =>               ( $importeS == '-' || $importeS == '-0' ) ? '': $importeS,
                        'ImporteUSD' =>             ( $ImporteUSD == '-' || $ImporteUSD == '-0' ) ? '': $ImporteUSD,
                        'Categoria' =>              $categoria,
                    );

                    // $exist = Reporte::where('Ledger', '=', $reporte['Ledger'])
                            // ->where('Periodo_Presupuestal', '=', $reporte['Periodo_Presupuestal'])
                            // ->where('Mes_Contable_mesN', '=', $reporte['Mes_Contable_mesN'])
                            // ->where('Nivel_2_COD', '=', $reporte['Nivel_2_COD'])
                            // ->where('Nivel_4_COD', '=', $reporte['Nivel_4_COD'])
                            // ->where('Unidad_COD', '=', $reporte['Unidad_COD'])
                            // ->where('Actividad_COD', '=', $reporte['Actividad_COD'])
                            // ->where('Sede_COD', '=', $reporte['Sede_COD'])
                            // ->where('Referencia_COD', '=', $reporte['Referencia_COD'])
                            // ->where('Desc_Nro_Doc', '=', $reporte['Desc_Nro_Doc'])
                            // ->exists();
                    // if(!$exist) {
                        $saved = Reporte::create($reporte);
                        if ( $reporte['Direccion'] == '' ||  $reporte['Area'] == '' ||  $reporte['TipoActividad'] == '' ||  $reporte['Criterio'] == '' ||  $reporte['Flujo'] == '' ||  $reporte['Categoria'] == '') {
                            $reporte['id'] = $saved->id;
                            array_push($data_response,$reporte);
                        }
                    // } 
                } else {
                    dd($colums);
                }
                
                
            }
        }

        return response()->json(['success' => (count($data_response) == 0 ? true : false), 'data' => $data_response ], 201);
    }

    public function update(Request $request){

        $req = $request->all();
        $arrData = $req['data'];
        $rows = explode('¥', $arrData);
        // dd($rows);
        $colums = [];
        $data_response = [];
        foreach($rows as $row){
            $colums = explode('¦', $row);   
            if ( trim($colums[0]) != '') {

                $reporte = array( 
                    'Ledger' =>                 $colums[0],
                    'Presupuesto' =>            $colums[1],
                    'Periodo_Presupuestal' =>   $colums[2],
                    'Nivel_0_Cod' =>            $colums[3],
                    'Nivel_1_COD' =>            $colums[4],
                    'Nivel_1_DESC' =>           $colums[5],
                    'Nivel_2_COD' =>            $colums[6],
                    'Nivel_2_DESC' =>           $colums[7],
                    'Nivel_4_COD' =>            $colums[8],
                    'Nivel_4_DESC' =>           $colums[9],
                    'Mes_Contable_ID_MES' =>    $colums[10],
                    'Mes_Contable_mesN' =>      $colums[11],
                    'Fecha_Contable' =>         $colums[12],
                    'Año_Fiscal' =>             $colums[13],
                    'Moneda' =>                 $colums[14],
                    'Unidad_COD' =>             $colums[15],
                    'Unidad_DESC' =>            $colums[16],
                    'Actividad_COD' =>          $colums[17],
                    'Actividad_DESC' =>         $colums[18],
                    'Sede_COD' =>               $colums[19],
                    'Sede_DESC' =>              $colums[20],
                    'Referencia_COD' =>         $colums[21],
                    'Referencia_DESC' =>        $colums[22],
                    'Linea_COD' =>              $colums[23],
                    'Linea_DESC' =>             $colums[24],
                    'Unidad_Negocio_PC_COD' =>  $colums[25],
                    'Unidad_Negocio_PC_DESC' => $colums[26],
                    'Proyecto_COD' =>           $colums[27],
                    'Proyecto_DESC' =>          $colums[28],
                    'Actividad_Proyecto_COD' => $colums[29],
                    'Actividad_Proyecto_DESC' =>$colums[30],
                    'Cd_Fondo_COD' =>           $colums[31],
                    'Cd_Fondo_DESC' =>          $colums[32],
                    'Cuenta_COD' =>             $colums[33],
                    'Cuenta_DESC' =>            $colums[34],
                    'Glosa' =>                  $colums[35],
                    'Desc_Origen_Doc' =>        $colums[36],
                    'Desc_Nro_Doc' =>           $colums[37],
                    'Desc_Tipo_Doc' =>          $colums[38],
                    'Registrador' =>            $colums[39],
                    'CliPro_Codigo' =>          $colums[40],
                    'CliPro_Nombre' =>          $colums[41],
                    'CliPro_Tipo_Doc' =>        $colums[42],
                    'CliPro_Númer_Doc' =>       $colums[43],
                    'Fecha_Factura' =>          $colums[44],
                    'Documento_Relacionado' =>  $colums[45],
                    'Moneda_Origen' =>          $colums[46],
                    'Fecha_Pago' =>             $colums[47],
                    'Igv_Tipo_Uso' =>           $colums[48],
                    'Importe2' =>               $colums[49],
                    'Importe_Dolares2' =>       $colums[50],
                    'CodCategoria' =>           $colums[51],
                    'Direccion' =>              $colums[52],
                    'Area' =>                   $colums[53],
                    'TipoActividad' =>          $colums[54],
                    'Criterio' =>               $colums[55],
                    'Flujo' =>                  $colums[56],
                    'ImporteS' =>               $colums[57],
                    'ImporteUSD' =>             $colums[58],
                    'Categoria' =>              $colums[59],
                );
                // dd($reporte);
                // Reporte::create($reporte);
                
                Reporte::where('id', $colums[60])
                ->update($reporte);
            }

            if ( $reporte['Direccion'] == '' ||  $reporte['Area'] == '' ||  $reporte['TipoActividad'] == '' ||  $reporte['Criterio'] == '' ||  $reporte['Flujo'] == '' || $reporte['Categoria'] == '') {
                $reporte['id'] = $colums[60];
                array_push($data_response,$reporte);
            }

                
        }

        // dd($data_response);
        return response()->json(['success' => (count($data_response) == 0 ? true : false), 'data' => $data_response ], 201);
    }

    public function ejecucion()
    {
        return view('reporte.ejecucion');
    }

    public function ejecucion_data()
    {
        $data_ejec_2020 = DB::select("EXEC usp_reporte_ejec '2020'");
        $data_ejec_2020_ej = DB::select("EXEC usp_reporte_ejec '2020', '1'");
        $data_ejec_2021 = DB::select("EXEC usp_reporte_ejec '2021'");
        $data_ejec_2021_ej = DB::select("EXEC usp_reporte_ejec '2021', '1'");
        $data_ppto_2020 = DB::select("EXEC usp_reporte_ppto '2020'");
        $data_ppto_2021 = DB::select("EXEC usp_reporte_ppto '2021'");
        $data_com_2020  = DB::select("EXEC usp_reporte_com '2020'");
        $data_com_2021  = DB::select("EXEC usp_reporte_com '2021'");
        // $reporte_agrupador  = DB::table('reporte_agrupador')->get();

        return response()->json([
            'data_ejec_2020' => $data_ejec_2020,
            'data_ejec_2020_ej' => $data_ejec_2020_ej, 
            'data_ejec_2021' => $data_ejec_2021, 
            'data_ejec_2021_ej' => $data_ejec_2021_ej,
            'data_ppto_2020' => $data_ppto_2020, 
            'data_ppto_2021' => $data_ppto_2021,
            'data_com_2020'  => $data_com_2020, 
            'data_com_2021'  => $data_com_2021, 
            // 'data_agrupador'  => $reporte_agrupador
        ], 201);
    }

    public function planilla()
    {
        return view('reporte.planilla');
    }

    public function planilla_data()
    {
        $data_ejec_2020 = DB::select("EXEC usp_reporte_2_ejec '2020'");
        $data_ppto_2021 = DB::select("EXEC usp_reporte_2_ppto '2021'");
        $data_ejec_2020_ej = DB::select("EXEC usp_reporte_2_ejec '2020', '1'");
        $data_ejec_2021_ej = DB::select("EXEC usp_reporte_2_ejec '2021', '1'");

        return response()->json([
            'data_ejec_2020' => $data_ejec_2020,
            'data_ppto_2021' => $data_ppto_2021, 
            'data_ejec_2020_ej' => $data_ejec_2020_ej, 
            'data_ejec_2021_ej' => $data_ejec_2021_ej
        ], 201);
    }

    public function direcciones()
    {
        return view('reporte.direcciones');
    }

    public function direcciones_data()
    {
        $data_base = DB::select("EXEC usp_reporte_3_base '2020'");
        $data_ppto_egresos = DB::select("EXEC usp_reporte_3_ppto_egresos '2021'");
        $data_ppto_ingresos = DB::select("EXEC usp_reporte_3_ppto_ingresos '2021'");
        $data_ejec_ingresos = DB::select("EXEC usp_reporte_3_ejec_ingresos '2021'");
        $data_ejec_egresos = DB::select("EXEC usp_reporte_3_ejec_egresos '2021'");
        $data_com_egresos = DB::select("EXEC usp_reporte_3_com_egresos '2021'");

        return response()->json([
            'data_base' => $data_base,
            'data_ppto_egresos' => $data_ppto_egresos, 
            'data_ppto_ingresos' => $data_ppto_ingresos, 
            'data_ejec_ingresos' => $data_ejec_ingresos, 
            'data_ejec_egresos' => $data_ejec_egresos, 
            'data_com_egresos' => $data_com_egresos
        ], 201);
    }
}
