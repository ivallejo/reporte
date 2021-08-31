<?php

namespace App\Http\Controllers;

use App\Reporte;
use App\ReportePerfil;
use Illuminate\Http\Request;

class ReportePerfilController extends Controller
{
    //
    public function index()
    {
        return view('reporte.perfil');
    }


    public function getCombos(Request $request) {
        $reporteperfil = ReportePerfil::select('id','Perfil', 'Unidad', 'Actividad', 'Sede', 'CodReferencia')->distinct()->get();
        $unidad = Reporte::select('Unidad_COD as cod', 'Unidad_DESC as desc')->distinct()->get();
        $actividad = Reporte::select('Actividad_COD as cod', 'Actividad_DESC as desc')->distinct()->get();
        $sede = Reporte::select('Sede_COD as cod', 'Sede_DESC as desc')->distinct()->get();
        $referencia = Reporte::select('Referencia_COD as cod', 'Referencia_DESC as desc')->distinct()->get();

        // dd($unidad);
        // array_unshift($unidad,['cod' => 'TODOS','desc' => 'TODOS']);
        // array_unshift($actividad,['cod' => 'TODOS','desc' => 'TODOS']);
        // array_unshift($sede,['cod' => 'TODOS','desc' => 'TODOS']);
        // array_unshift($referencia,['cod' => 'TODOS','desc' => 'TODOS']);

        return response()->json(['success' => true, 'reporteperfil' => $reporteperfil, 'unidad' => $unidad, 'actividad' => $actividad,'sede' => $sede,'referencia' => $referencia,], 201);
    }

    public function save(Request $request){
        $req = $request->all();
        $row = $req['data'];
        $colums = explode('¦', $row);
        $reporte_perfil = array( 
            'Perfil'        => $colums[0],
            'Unidad'        => $colums[1],
            'Actividad'     => $colums[2],
            'Sede'          => $colums[3],
            'CodReferencia' => $colums[4]
        );
        $exist = ReportePerfil::where('Perfil', '=', $reporte_perfil['Perfil'])
                        ->where('Unidad', '=', $reporte_perfil['Unidad'])
                        ->where('Actividad', '=', $reporte_perfil['Actividad'])
                        ->where('Sede', '=', $reporte_perfil['Sede'])
                        ->where('CodReferencia', '=', $reporte_perfil['CodReferencia'])
                        ->exists();
        if(!$exist) ReportePerfil::create($reporte_perfil);
        return response()->json(['success' => $exist], 201);
    }

    public function delete(Request $request){
        $req = $request->all();
        $id = $req['id'];
        ReportePerfil::destroy($id);
        return response()->json(['success' => true], 201);
    }

}
