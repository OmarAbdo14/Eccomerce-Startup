<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
//use App\Http\Requests\admins\CreateAdminRequest;
//use App\Http\Requests\admins\UpdateAdminRequest;
use App\Http\Requests\Admin\admins\LoginAdminRequest;
use App\Http\Requests\Admin\admins\UpdateAdminRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use JWTAuth;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HasFactory;
    use GeneralTrait;
    use APIsTrait;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
//    public function __construct() {
//        $this->middleware('auth:api', ['except' => ['login', 'register']]);
//    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginAdminRequest $request) {
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

    public function logout(Request $request) {
//        auth()->logout();
//        return $this->returnSuccessMessage('Successfully logged out');
        $token = $request->header('auth_token');
        if ($token) {
            try {
                JWTAuth::setToken($token)->invalidate();
            } catch (TokenInvalidException $e) {
                return $this->returnError('', 'Invalid Token');
            }
            return $this->returnSuccessMessage('Logged out');
        } else {
            $this->returnError('', 'There is no token sent');
        }
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
