<?php

namespace App\Http\Controllers;

use App\Reporte;
use App\ReporteCategorizacion;
use Illuminate\Http\Request;

class ReporteCategorizacionController extends Controller
{
    public function index()
    {
        return view('reporte.categorizacion');
    }

    public function getData(Request $request) {
        $data = ReporteCategorizacion::get();
        return response()->json(['success' => true, 'data' => $data], 201);
    }

    public function save(Request $request){
        $req = $request->all();
        $row = $req['data'];
        $colums = explode('¦', $row);
        $reporte_perfil = array( 
            'Chartfield'        => $colums[0],
            'Categoria'        => $colums[1],
            'Direccion'     => $colums[2],
            'Area'          => $colums[3],
            'TipoActividad' => $colums[4]
        );
        ReporteCategorizacion::create($reporte_perfil);
        return response()->json(['success' => true], 201);
    }

    public function delete(Request $request){
        $req = $request->all();
        $id = $req['id'];
        ReporteCategorizacion::destroy($id);
        return response()->json(['success' => true], 201);
    }

}
