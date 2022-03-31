<?php

namespace App\Http\Requests\admins\product_types;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateProductTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'                   =>[ 'required', 'string', Rule::unique('product_types', 'title') ],
            'image'                   =>[ 'required', 'image' ],
        ];
    }


    public function messages()
    {

        return [
            'title.required'                    =>'Field is required',
            'title.string'                      =>'Field must be string',
            'title.unique'                      =>'Field must be unique',

            'image.required'                    =>'Field is required',
            'image.image'                       =>'Image must be uploaded',
        ];
    }
}
