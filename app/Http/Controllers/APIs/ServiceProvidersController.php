<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\service_providers\RegisterServiceProviderRequest;
use App\Http\Requests\service_providers\UpdateServiceProviderRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\ServiceProvider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class ServiceProvidersController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllServiceProviders()
    {
        $serviceProviders = ServiceProvider::all()->map(function ($serviceProvider, $key) {
            $serviceProvider->products;
            return $serviceProvider;
        });
        if (count($serviceProviders) >= 1) {
            return $this->returnData('service_providers', $serviceProviders, 'All service Providers has been returned successfully');
        } else {
            return $this->returnError('There is not any service Provider', 'S004');
        }
    }

    public function getServiceProvider(Request $request, $id)
    {
        $serviceProvider = ServiceProvider::find($request->id);
        if ($serviceProvider) {
            $serviceProvider->products;
            return $this->returnData('service_provider', $serviceProvider, 'Service Provider has been returned successfully');
        } else {
            return $this->returnError('This Service Provider is not exist', "S004");
        }
    }

    public function updateServiceProvider(UpdateServiceProviderRequest $request, $id)
    {
        $request->validated();

        $password = bcrypt($request->password);

        //Get ServiceProvider
        $serviceProvider = ServiceProvider::find($id);
        if (!$serviceProvider)
            return $this->returnError('This ServiceProvider is not exist anymore', 'S004');

        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/service_providers');
        } else {
            $imgPath = null;
        }
        //update user
        $serviceProvider->update([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $password,
            'phone' => $request->phone,
            'organization_name' => $request->organization_name,
            'organization_location' => $request->organization_location,
            'image' => $imgPath,
        ]);

        if ($request->exists('geofences'))
            $serviceProvider_geofence = $serviceProvider->associatedGeofences()->sync($request->geofences);
        if ($serviceProvider) {
            return $this->returnSuccessMessage('ServiceProvider has been updated successfully');
        } else
            return $this->returnError('This user can\'t be updated', 'S003');
    }

    public function deleteServiceProvider($id)
    {
        $serviceProvider = ServiceProvider::find($id);   // ServiceProvider::where('id','$request->id') -> first();
        if (!$serviceProvider)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $serviceProvider->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Service Provider No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This Service Provider can\'t be deleted', 'S003');
    }

    /**

     * Register an admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterServiceProviderRequest $request) {
        $request->validated();

        $password = bcrypt($request->password);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/service_providers');
            } else {
                $imgPath = null;
            }
            $serviceProvider = ServiceProvider::create([
                'full_name' => $request->full_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $password,
                'phone' => $request->phone,
                'organization_name' => $request->organization_name,
                'organization_location' => $request->organization_location,
                'image' => $imgPath,
            ]);

            if($serviceProvider) {
                return $this-> returnSuccessMessage('Service Provider successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
//        }
//
//        return $data;
    }

    public function login(LoginRequest $request) {
        try {
            $request->validated();

            // $serviceProvider = Auth::guard('user-api')->user();
            $serviceProvider = ServiceProvider::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();

            if(!$serviceProvider) {
                return $this->returnError('Email/Username is incorrect', 'S001');
            } else if(password_verify($request->password, $serviceProvider->password)) {
                $serviceProvider->products;

                // update user firebase token
                if($request->firebase_token) {
                    $serviceProvider->update([
                        'firebase_token'=> $request->firebase_token,
                    ]);
                }

    //             $credentials = $request->only(['email', 'password']);
    //             $token = Auth::guard('user-api')->attempt($credentials);
                $token = JWTAuth::fromUser($serviceProvider);
                if (!$token) {
                    return $this->returnError('Unauthorized', 'E3001');
                }
                $serviceProvider->token = $token;

                return $this->returnData('service_provider', $serviceProvider, 'returned token');

            } else {
                return $this->returnError('password doesn\'t match', 'S002');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getMessage(), $e->getCode() );
        }
    }

    protected function createNewToken($token){
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => env('TTL') * 60,
        ];
    }
}
