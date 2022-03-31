<?php
//  header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//  header('Access-Control-Allow-Headers: X-CSRF-TOKEN, X-Requested-With');
//  header('Access-Control-Allow-Origin: http://192.168.1.7:8001');
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIs\AdminsController;
use App\Http\Controllers\APIs\UsersController;
use App\Http\Controllers\APIs\ServiceProvidersController;
use App\Http\Controllers\APIs\AuthController;
use App\Http\Controllers\CMSController;
use App\Http\Controllers\APIs\Admin\ProductTypesController;
use App\Http\Controllers\APIs\ServiceProvider\ProductsController;
use App\Http\Controllers\APIs\Admin\CategoriesController;
use App\Http\Controllers\APIs\Admin\SettingsController;
use App\Http\Controllers\APIs\Admin\NotificationsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group( ['prefix'=>'auth'] , function ($router) {
    Route::post('/admin-login', [AdminsController::class, 'login']);
    Route::post('/user-login', [UsersController::class, 'login']);
    Route::post('/service-provider-login', [ServiceProvidersController::class, 'login']);
    Route::post('/service-provider/register', [ServiceProvidersController::class, 'register']);
    Route::post('/user/register', [UsersController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);

    Route::post('/send-notification', [NotificationsController::class, 'sendNotificationToMobile']);

    Route::group(['prefix'=>'admin', 'middleware'=>'auth.guard:admin-api'], function() {
        Route::post('/register', [AdminsController::class, 'register']);
        Route::get('/all', [AdminsController::class, 'getAllAdmins']);
        Route::get('/get-admin/{id}', [AdminsController::class, 'getAdmin']);
        Route::put('/update/{id}', [AdminsController::class, 'updateAdmin']);
        Route::delete('/delete/{id}', [AdminsController::class, 'deleteAdmin']);

        Route::group(['prefix'=>'categories', ], function() {
            Route::get('/all', [CategoriesController::class, 'getAllCategories']);
            Route::get('/get-category/{id}', [CategoriesController::class, 'getCategory']);
            Route::post('/add', [CategoriesController::class, 'addCategory']);
            Route::put('/update/{id}', [CategoriesController::class, 'updateCategory']);
            Route::delete('/delete/{id}', [CategoriesController::class, 'deleteCategory']);
        });

        Route::group(['prefix'=> 'product-types'], function () {
            Route::get('/all', [ProductTypesController::class, 'getAllProductTypes']);
            Route::get('/get-product-type/{id}', [ProductTypesController::class, 'getProductType']);
            Route::post('/add', [ProductTypesController::class, 'addProductType']);
            Route::put('/update/{id}', [ProductTypesController::class, 'updateProductType']);
            Route::delete('/delete/{id}', [ProductTypesController::class, 'deleteProductType']);
        });

        Route::group(['prefix'=> 'notifications'], function () {
            Route::post('/add', [NotificationsController::class, 'storeNotification']);
            Route::get('/all', [NotificationsController::class, 'getAllNotifications']);
            Route::delete('/delete/{id}', [NotificationsController::class, 'deleteNotification']);
        });

        Route::group(['prefix'=>'settings'], function() {
            Route::get('/get-settings', [SettingsController::class, 'getAllSettings']);
            Route::put('/save-settings', [SettingsController::class, 'saveSettings']);
        });
    });

    Route::group(['prefix'=>'service-provider', 'middleware'=>'auth.guard:service-provider-api'], function() {
        Route::get('/all', [ServiceProvidersController::class, 'getAllServiceProviders']);
        Route::get('/get-service-provider/{id}', [ServiceProvidersController::class, 'getServiceProvider']);
        Route::post('/add', [ServiceProvidersController::class, 'addServiceProvider']);
        Route::put('/update/{id}', [ServiceProvidersController::class, 'updateServiceProvider']);
        Route::delete('/delete/{id}', [ServiceProvidersController::class, 'deleteServiceProvider']);
        Route::group(['prefix'=>'products',], function() {
            Route::post('/add', [ProductsController::class, 'addProduct']);
            Route::put('/update/{id}', [ProductsController::class, 'updateProduct']);
        });
    });

    Route::group(['prefix'=>'user', 'middleware'=>'auth.guard:user-api'], function() {
        Route::get('/all', [UsersController::class, 'getAllUsers']);
        Route::get('/get-user/{id}', [UsersController::class, 'getUser']);
        Route::post('/add', [UsersController::class, 'addUser']);
        Route::put('/update/{id}', [UsersController::class, 'updateUser']);
        Route::delete('/delete/{id}', [UsersController::class, 'deleteUser']);

        Route::group(['prefix'=>'products',], function() {
            Route::get('/all', [ProductsController::class, 'getAllProducts']);
            Route::get('/get-product/{id}', [ProductsController::class, 'getProduct']);
        });
    });

});



