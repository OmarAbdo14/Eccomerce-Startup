<?php

namespace App\Http\Requests\service_providers\products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUpdateProductRequest extends FormRequest
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
            'price'                   =>[ 'required', 'digits' ],
            'offer_percent'           =>[ 'required', 'digits_between:0,100' ],
            'is_shipping'             =>[ 'required', 'boolean' ],
            'rate'                    =>[ 'required', 'digits' ],
            'tags'                    =>[ 'required', 'array' ],
            'service_provider_id'     =>[ 'required', 'integer' ],
            'product_type_id'         =>[ 'required', 'integer' ],
            'category_id'             =>[ 'required', 'integer' ],
            'image'                   =>[ 'required', 'image' ],
        ];
    }


    public function messages()
    {

        return [
            'title.required'                    =>'Field is required',
            'title.string'                      =>'Field must be string',

            'desc.required'                     =>'Field is required',
            'desc.string'                       =>'Field must be string',

            'price.required'                    =>'Field is required',
            'price.digits'                      =>'Field must be digits',

            'offer_percent.required'            =>'Field is required',
            'offer_percent.digits_between'      =>'Field must be digits between 0 and 100',

            'is_shipping.required'              =>'Field is required',
            'is_shipping.boolean'               =>'Field must be boolean',

            'image.required'                    =>'Field is required',
            'image.image'                       =>'Image must be uploaded',
        ];
    }
}
