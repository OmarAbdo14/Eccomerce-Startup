<?php

namespace App\Http\Requests\service_providers\products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
            'title'                   =>[ 'required', 'string' ],
            'desc'                    =>[ 'required', 'string' ],
            'price'                   =>[ 'required', 'numeric' ],
            'offer_percent'           =>[ 'required', 'min:0', 'max:100' ],
            'rate'                    =>[ 'required', 'min:0', 'max:5' ],
            'is_shipping'             =>[ 'required', 'boolean' ],
            'tags'                    =>[ 'nullable', ],
            'service_provider_id'     =>[ 'required', 'integer' ],
            'product_type_id'         =>[ 'required', 'integer' ],
            'category_id'             =>[ 'required', 'integer' ],
            'image'                   =>[ 'required', 'image' ],
        ];
    }


    public function messages()
    {

        return [
            'title.required'                    =>'title is required',
            'title.string'                      =>'title must be string',

            'desc.required'                     =>'desc is required',
            'desc.string'                       =>'desc must be string',

            'price.required'                    =>'price is required',
            'price.numeric'                     =>'price must be numeric',

            'offer_percent.required'            =>'offer_percent is required',

            'rate.required'            =>'rate is required',

            'is_shipping.required'              =>'is_shipping is required',
            'is_shipping.boolean'               =>'is_shipping must be boolean',

            'service_provider_id.required'            =>'service_provider_id is required',
            'product_type_id.required'            =>'product_type_id is required',
            'category_id.required'            =>'category_id is required',

            'image.required'                    =>'image is required',
            'image.image'                       =>'image must be uploaded',
        ];
    }
}
