<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admins\categories\CreateCategoryRequest;
use App\Http\Requests\admins\categories\UpdateCategoryRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllCategories() {
        $categories = Category::all()->map(function ($category, $key) {
            $category->products;
            return $category;
        });
        if($categories && $categories->count()>=1) {
            return $this->returnData('categories', $categories, 'All categories have been returned successfully');
        } else {
            return $this->returnError('there is not any category', 'S004');
        }
    }

    public function getCategory(Request $request) {
        $category = Category::find($request->id);
        if($category) {
            $category->products;

            return $this->returnData('category', $category, 'Category has been returned successfully');
        } else {
            return $this->returnError('this category does not exist', 'S004');
        }
    }

    public function addCategory(CreateCategoryRequest $request) {
        $request->validated();

        //Upload Image
        if($request->hasFile('image')) {
            $imgPath = $this->saveFile($request->image, 'public/images/categories');
        } else {
            $imgPath = null;
        }

        $category = Category::create([
            'title'=> $request->title,
            'image'=> $imgPath,
        ]);

        if($category) {
            return $this->returnSuccessMessage('category has been added successfully');
        } else {
            return $this->returnError('category can\'t be added', 'S002');
        }
    }

    public function updateCategory(UpdateCategoryRequest $request) {
        $request->validated();
        $category = Category::find($request->id);
        if($category) {
            //Upload Image
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/categories');
            } else {
                $imgPath = null;
            }

            $category->update([
                'title'=> $request->title,
                'image'=> $imgPath,
            ]);

            if($category) {
                return $this->returnSuccessMessage('category has been updated successfully');
            } else {
                return $this->returnError('category can\'t be updated', 'S002');
            }
        } else {
            return $this->returnError('This category doesn\'t exist anymore', 'S003');
        }
    }

    public function deleteCategory($id)
    {
        $user = Category::find($id);   // Category::where('id','$request->id') -> first();
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $user->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Category No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This Category can\'t be deleted', 'S003');
    }
}
