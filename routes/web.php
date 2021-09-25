<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', 'ReporteController@index');
Route::post('saveData', 'ReporteController@save');
Route::post('updateData', 'ReporteController@update');
Route::get('/ejecucion', 'ReporteController@ejecucion');
Route::post('/ejecucion/data', 'ReporteController@ejecucion_data');
Route::get('/planilla', 'ReporteController@planilla');
Route::post('/planilla/data', 'ReporteController@planilla_data');
Route::get('/direcciones', 'ReporteController@direcciones');
Route::post('/direcciones/data', 'ReporteController@direcciones_data');

Route::get('/reporte', 'ReporteController@reporte');

Route::get('/perfil', 'ReportePerfilController@index');
Route::post('/perfil_get', 'ReportePerfilController@getCombos');
Route::post('/perfil_save', 'ReportePerfilController@save');
Route::post('/perfil_delete', 'ReportePerfilController@delete');

Route::get('/categorizacion', 'ReporteCategorizacionController@index');
Route::post('/categorizacion_get', 'ReporteCategorizacionController@getData');
Route::post('/categorizacion_save', 'ReporteCategorizacionController@save');
Route::post('/categorizacion_delete', 'ReporteCategorizacionController@delete');

Route::get('/proyeccioningresos', 'ReporteProyeccionIngresosController@index');
Route::post('/proyeccioningresos_get', 'ReporteProyeccionIngresosController@getData');
Route::post('/proyeccioningresos_save', 'ReporteProyeccionIngresosController@save');
Route::post('/proyeccioningresos_delete', 'ReporteProyeccionIngresosController@delete');



