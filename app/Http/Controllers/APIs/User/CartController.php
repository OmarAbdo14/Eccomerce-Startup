<?php

namespace App\Http\Controllers\APIs\User;

use App\Cart;
use App\Http\Controllers\Controller;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\ServiceProvider\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function addProductToCart(Request $request) {
        $prevCart = $request->session()->get('cart');
        $cart = new Cart($prevCart);

        $product = Product::find($request->id);
        $cart->addItem($request->id, $product);
        $request->session()->put('cart', $cart);

        return $this->returnSuccessMessage('product has been added to the cart successfully');
    }

    public function showCart() {
        $cart = Session::get('cart');
        if($cart) { // cart is not empty
            return $this->returnData('cart', $cart, 'Cart has been returned successfully');
        } else { // cart is empty
            return $this->returnError('there is no cart found', 'S001');
        }
    }

    public function deleteItemFromCart(Request $request) {
        $cart = $request->session()->get('cart');

        if(array_key_exists($request->id, $cart->items)) { //this item already exist
            unset($cart->items[$request->id]);
        }

        $prevCart = $request->session()->get('cart');
        $updatedCart = new Cart($prevCart);

        $request->session()->put('cart', $cart);

        $this->returnSuccessMessage('product has been removed from cart');
    }
}
