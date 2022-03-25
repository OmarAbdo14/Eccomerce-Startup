<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\users\UpdateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\ServiceProvider\Order;
use App\Models\ServiceProvider\OrderItem;
use App\Models\User;
use App\Models\User\UserOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use JWTAuth;

class UsersController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllUsers()
    {
        $users = User::all()->map(function ($user, $key) {
            $user->orders;
            return $user;
        });
        if (count($users) >= 1) {
            return $this->returnData('users', $users, 'All users has been returned successfully');
        } else {
            return $this->returnError('There is not any user', 'S004');
        }
    }

    public function getUser(Request $request, $id)
    {
        $user = User::find($request->id);
        if ($user) {
            $user->orders;

            return $this->returnData('user', $user, 'User has been returned successfully');
        } else {
            return $this->returnError('This User is not exist', "S004");
        }
    }

    public function updateUser(UpdateUserRequest $request, $id)
    {
        $request->validated();

        //Get User
        $user = User::find($id);
        if (!$user)
            return $this->returnError('This User is not exist anymore', 'S004');

        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/users');
        } else {
            $imgPath = null;
        }

        //update user
        User::where('id', $id)->update([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'firebase_token' => $request->firebase_token,
            'phone' => $request->phone,
            'location_country' => $request->location_country,
            'location_city' => $request->location_city,
            'location_area' => $request->location_area,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'image' => $imgPath,
        ]);

        if ($request->exists('geofences'))
            $user_geofence = $user->associatedGeofences()->sync($request->geofences);
        if ($user) {
            return $this->returnSuccessMessage('User has been updated successfully');
        } else
            return $this->returnError('This user can\'t be updated', 'S003');
    }

    public function deleteUser($id)
    {
        $user = User::find($id);   // User::where('id','$request->id') -> first();
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $user->delete();
        if ($deleted)
            return $this->returnSuccessMessage('User No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This User can\'t be deleted', 'S003');
    }

    public function register(RegisterRequest $request) {
        $request->validated();

        $password = bcrypt($request->password);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/users');
            } else {
                $imgPath = null;
            }
            $user = User::create([
                'full_name' => $request->full_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $password,
                'phone' => $request->phone,
                'location_country' => $request->location_country,
                'location_city' => $request->location_city,
                'location_area' => $request->location_area,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'image' => $imgPath,
            ]);

            if($user) {
                return $this-> returnSuccessMessage('User successfully registered');
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

            // $user = Auth::guard('user-api')->user();
            $user = User::where('username', '=', $request->username)->first();


            $password = $request->password;
            // $password = bcrypt($request->password);
            // check password
            // if(!Hash::check($password, $user->password)) {
            if(!$user) {
                return $this->returnError('Email/Username is incorrect', 'S001');
            } else if($password !== $user->password) {
                return $this->returnError('password doesn\'t match', 'S002');
            }

            // update user firebase token
            if($request->firebase_token) {
                $user->update([
                    'firebase_token'=> $request->firebase_token,
                ]);
            }

//             $credentials = $request->only(['email', 'password']);
//             $token = Auth::guard('user-api')->attempt($credentials);
            $token = JWTAuth::fromUser($user);
            if (!$token) {
                return $this->returnError('Unauthorized', 'E3001');
            }

            return $this->returnData('data', $user, 'returned token');

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

    public function createOrder() {
        $cart = Session::get('cart');

        if ($cart){ //cart is not empty
            $date = date('Y-m-d H:i:s');
            $newOrderArray = [
                'status' => 'on_hold',
                'date' => $date,
                'del_date' => $date,
                'price' => $cart->totalPrice
            ];
            $createdOrder = Order::create($newOrderArray);
            $order_id = $createdOrder->id;
            // get the authenticated user
            $user = Auth::user();
            $user_order = UserOrder::create([
                'user_id'=>$user->id,
                'order_id'=> $order_id,
            ]);

            foreach ($cart->items as $cart_item) {
                $item_id = $cart_item['data']['id'];
//                $item_data = json_encode($cart_item['data']);
                $item_name = $cart_item['data']['name'];
                $item_price = $cart_item['data']['price'];
                $newItemsInCurrentOrders = [
                    'item_id'=>$item_id,
//                    'item_data'=>$item_data,
                    'order_id'=>$order_id,
                    'item_name'=>$item_name,
                    'item_price'=>$item_price,
                ];
                $created_order_items = OrderItem::create($newItemsInCurrentOrders);
            }

            // delete cart
            Session::forget('cart');
            Session::flush();

            $payment_info = $newOrderArray;
            Session::put('payment_info', $payment_info);

            return $this->returnSuccessMessage('order has been created successfully');
        } else {
            return $this->returnError('order is empty', 'S004');
        }
    }

}
