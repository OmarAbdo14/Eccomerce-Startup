<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CMSController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
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


// CMS
Route::group(['prefix'=>'/cms'], function (){
    Route::get('/',[CMSController::class, 'showSections'])->name('cms.sections');
    Route::get('/section/{id}',[CMSController::class,'showSectionForm'])->name('cms.sectionForm');
    Route::post('/section/update/{id}',[CMSController::class,'updateSection'])->name('cms.sectionUpdate');
});

Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]], function() {
//    Route::get('/dashboard/geofences/all', [\App\Http\Controllers\APIs\Admin\GeofencesController::class, 'index']);
    Route::get('/{mainPath?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}/{higherLevel2?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}/{higherLevel2?}/{higherLevel3?}', [CMSController::class, 'returnViewWithLang']);
});
