<?php

namespace App\Http\Controllers;

use App\Reporte;
use App\ReporteProyeccionIngresos;
use Illuminate\Http\Request;

class ReporteProyeccionIngresosController extends Controller
{
    //
    public function index()
    {
        return view('reporte.proyeccioningresos');
    }

    public function getData(Request $request) {
        $data = ReporteProyeccionIngresos::get();
        return response()->json(['success' => true, 'data' => $data], 201);
    }

    public function save(Request $request){
        $req = $request->all();
        $row = $req['data'];
        $colums = explode('¦', $row);
        $reporte_perfil = array( 
            'Procedencia'        => $colums[0],
            'Cartera'        => $colums[1],
            'TipoPrograma'     => $colums[2],
            'Detalle'          => $colums[3],
            'NombrePrograma' => $colums[4],
            'Chartfields' => $colums[5],
            'CodUnidad' => $colums[6],
            'CodNivel4' => $colums[7],
            'ChartfieldsPartida' => $colums[5] . '.' . $colums[7],
            'Status' => ($colums[3] == "COMPROMETIDO" || $colums[3] == "EJECUTADO" ) ? "Inaugurado" : ""
        );
        ReporteProyeccionIngresos::create($reporte_perfil);
        return response()->json(['success' => true], 201);
    }

    public function delete(Request $request){
        $req = $request->all();
        $id = $req['id'];
        ReporteProyeccionIngresos::destroy($id);
        return response()->json(['success' => true], 201);
    }

}
