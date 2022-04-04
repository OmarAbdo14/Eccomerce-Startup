<?php

namespace App\Http\Controllers\APIs\ServiceProvider;

use App\Cart;
use App\Http\Controllers\Controller;
use App\Http\Requests\service_providers\products\CreateProductRequest;
use App\Http\Requests\service_providers\products\UpdateProductRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin\Category;
use App\Models\ServiceProvider\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllProducts() {
        $products = Product::all()->map(function ($product, $key) {
            $product->serviceProvider;
            $product->productType;
            $product->category;
            return $product;
        });
        if($products && $products->count()>=1) {
            return $this->returnData('products', $products, 'All products have been returned successfully');
        } else {
            return $this->returnError('there is not any product', 'S004');
        }
    }

    public function getCategoryProducts(Request $request) {
        $category = Category::find($request->category_id);
        if($category) {
            return $this->returnData('products', $category->products, 'All products have been returned successfully');
        } else {
            return $this->returnError('this category does not exist', 'S004');
        }
    }

    public function getProduct(Request $request) {
        $product = Product::find($request->id);
        if($product) {
            $product->serviceProvider;
            $product->productType;
            $product->category;

            return $this->returnData('product', $product, 'Product has been returned successfully');
        } else {
            return $this->returnError('this product does not exist', 'S004');
        }
    }

    public function addProduct(CreateProductRequest $request) {
        $request->validated();

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/products');
        } else {
            $imgPath = null;
        }

        $product = Product::create([
            'title'=> $request->title,
            'desc'=> $request->desc,
            'price'=> $request->price,
            'offer_percent'=> $request->offer_percent,
            'is_shipping'=> $request->is_shipping,
            'rate'=> $request->rate,
            'tags'=> json_encode($request->tags),
            'service_provider_id'=> $request->service_provider_id,
            'product_type_id'=> $request->product_type_id,
            'category_id'=> $request->category_id,
            'image'=> $imgPath,
        ]);

        if($product) {
            return $this->returnSuccessMessage('product has been added successfully');
        } else {
            return $this->returnError('product can\'t be added', 'S002');
        }
    }

    public function updateProduct(UpdateProductRequest $request, $id) {
        $request->validated();

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/products');
        } else {
            $imgPath = null;
        }

        $product = Product::find($id);
        $product->update([
            'title'=> $request->title,
            'desc'=> $request->desc,
            'price'=> $request->price,
            'offer_percent'=> $request->offer_percent,
            'is_shipping'=> $request->is_shipping,
            'rate'=> $request->rate,
            'tags'=> json_encode($request->tags),
            'service_provider_id'=> $request->service_provider_id,
            'product_type_id'=> $request->product_type_id,
            'category_id'=> $request->category_id,
            'image'=> $imgPath,
        ]);

        if($product) {
            return $this->returnSuccessMessage('product has been updated successfully');
        } else {
            return $this->returnError('product can\'t be updated', 'S002');
        }
    }

    public function deleteProduct($id)
    {
        $user = Product::find($id);   // Product::where('id','$request->id') -> first();
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $user->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Product No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This Product can\'t be deleted', 'S003');
    }


}
