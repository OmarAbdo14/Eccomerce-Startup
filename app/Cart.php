<?php

namespace App;

use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class Cart
{
    use APIsTrait;
    use GeneralTrait;

    public $items; // ['id'= >['quantity'= >val, 'price'= >val, 'data'= >[product data]], ...]
    public $totalQuantity;
    public $totalPrice;
    /**
     * Cart Constructor
     */
    public function __constructor($prevCart) {
        if($prevCart!= null) {
            $this->items = $prevCart->items;
            $this->totalQuantity = $prevCart->totalQuantity;
            $this->totalPrice = $prevCart->totalPrice;
        } else {
            $this->items = [];
            $this->totalQuantity = 0;
            $this->totalPrice = 0;
        }
    }

    public function addItem($id, $product) {
        $price = str_replace('$', '', $product->price);

        if(array_key_exists($id, $this->items)) { //this item already exist
            $productToAdd = $this->items[$id];
            ++$productToAdd['quantity'];

        } else { // first time to add this item
            $productToAdd = ['quantity'=>1, 'totalSinglePrice'=>$price, 'data'=>$product];
        }

        $this->items[$id] = $productToAdd;
        ++$this->totalQuantity;
        $this->totalPrice += $price;
    }

    public function updatePriceQuantity() {
        $totalPrice = 0;
        $totalQuantity = 0;

        foreach ($this->items as $item) {
            $totalQuantity += $item['quantity'];
            $totalPrice += $item['totalSinglePrice'];
        }

        $this->totalQuantity = $totalQuantity;
        $this->totalQuantity = $totalQuantity;
    }
}
