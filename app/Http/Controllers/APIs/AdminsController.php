<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\admins\UpdateAdminRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use JWTAuth;

class AdminsController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllAdmins() {
        $admins = Admin::all()->map(function ($admin) {
            $admin->permissions = json_decode($admin->permissions);
            return $admin;
        });

        if (count($admins) !=0) {
            return $this-> returnData('admins', $admins, 'All admins has been returned successfully');
        } else {
            return $this-> returnError('There is not any admin', "S004");
        }
    }

    public function getAdmin($id)
    {
        $admin = Admin::find($id);
        if ($admin) {
            $admin->permissions = json_decode($admin->permissions);
            return $this-> returnData('admin', $admin, 'Admin has been returned successfully');
        } else {
            return $this-> returnError('This admin is not exist', "S004");
        }
    }

    public function updateAdmin(UpdateAdminRequest $request, $id) {
        $request->validated();

        //Get Admin
        $admin = Admin::find($id);
        if (!$admin)
            return $this-> returnError('This Admin is not exist anymore', 'S004');

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/admins');
        } else {
            $imgPath = null;
        }

        //update data
        $admin = Admin::where('id',$id)->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'username' => $request->username,
            // 'password' => $request->password,
            'permissions' => json_encode(array($request->permissions)),
            'image' => $imgPath,
        ]);

        if($admin) {
            /**
             * Refresh a token.
             *
             * @return \Illuminate\Http\JsonResponse
             */
//            $token = $this->respondWithToken(auth()->refresh());
//            $admin->api_token = $token;
            return $this-> returnSuccessMessage('Admin has been updated successfully');
        } else
            return $this-> returnError('This admin can\'t be updated', 'S003');
    }

    public function deleteAdmin($id) {
        $admin = Admin::find($id);   // Admin::where('id','$request->id') -> first();
        if (!$admin)
            return $this-> returnError('This admin is not exist anymore', 'S004');

        $deleted = $admin->delete();
        if($deleted)
            return $this-> returnSuccessMessage('Admin No. '."$id".' has been deleted successfully');
        else
            return $this-> returnError('This admin can\'t be deleted', 'S003');
    }

    /**

     * Register an admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request) {
        $request->validated();

        $password = $this->passwordGenerator(new Admin, 'password', 8, 'Admin');
//        $password = bcrypt($this->passwordGenerator(new Admin, 'password', 8, 'Admin'));

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/admins');
            } else {
                $imgPath = null;
            }
            $admin = Admin::create([
                'full_name' => $request->full_name,
                'username' => $request->username,
                'email' => $request->email,
                'permissions' => json_encode($request->permissions),
                'image' => $imgPath,
                'password' => $password,
            ]);

            if($admin) {
                return $this-> returnSuccessMessage('Admin successfully registered');
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
//            $password = bcrypt($request->password);
            $admin = Admin::where('email', '=', $request->identifier)->first();
            if(!$admin) {
                $admin = Admin::where('username', '=', $request->identifier)->first();
            }
            $password = $request->password;

            // check password
//            if(!Hash::check($password, $admin->password)) {
            if(!$admin) {
                return $this->returnError('Email/Username is incorrect', 'S001');
            } else if($password !== $admin->password) {
                return $this->returnError('password doesn\'t match', 'S002');
            }

            // Login
//            $credentials = $request->only(['email', 'password']);
//            $token = JWTAuth::attempt($credentials);
//            $admin = Auth::guard('api')->admin();
//            $admin = JWTAuth::user();

            $token = JWTAuth::fromUser($admin);
            if (!$token) {
                return $this->returnError('Unauthorized', 'E3001');
            }
            $admin->permissions = json_decode($admin->permissions);
            $admin->api_token = $this->createNewToken($token);
            return $this->returnData('admin', $admin, 'returned token');
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

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}

