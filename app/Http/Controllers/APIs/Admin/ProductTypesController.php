<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admins\product_types\CreateUpdateProductTypeRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin\ProductType;
use Illuminate\Http\Request;

class ProductTypesController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllProductTypes() {
        $product_types = ProductType::all()->map(function ($product_type, $key) {
            $product_type->products;
            return $product_type;
        });
        if($product_types && $product_types->count()>=1) {
            return $this->returnData('product_types', $product_types, 'All product types have been returned successfully');
        } else {
            return $this->returnError('there is not any product types', 'S004');
        }
    }

    public function getProductTypeById(Request $request) {
        $product_type = ProductType::find($request->id);
        if($product_type) {
            $product_type->products;
            return $this->returnData('product_type', $product_type, 'Product type has been returned successfully');
        } else {
            return $this->returnError('this product type does not exist', 'S004');
        }
    }

    public function addProductType(CreateUpdateProductTypeRequest $request) {
        $request->validated();

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/product_types');
        } else {
            $imgPath = null;
        }

        $product_type = ProductType::create([
            'title'=> $request->title,
            'image'=> $imgPath,
        ]);

        if($product_type) {
            return $this->returnSuccessMessage('product type has been added successfully');
        } else {
            return $this->returnError('product type can\'t be added', 'S002');
        }
    }

    public function updateProductType(CreateUpdateProductTypeRequest $request) {
        $request->validated();

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/product_types');
        } else {
            $imgPath = null;
        }

        $product_type = ProductType::update([
            'title'=> $request->title,
            'image'=> $imgPath,
        ]);

        if($product_type) {
            return $this->returnSuccessMessage('product type has been updated successfully');
        } else {
            return $this->returnError('product type can\'t be updated', 'S002');
        }
    }

    public function deleteProductType($id)
    {
        $user = ProductType::find($id);   // ProductType::where('id','$request->id') -> first();
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $user->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Product type No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This product type can\'t be deleted', 'S003');
    }
}
