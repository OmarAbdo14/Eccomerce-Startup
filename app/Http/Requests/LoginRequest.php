<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
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
            'identifier' => [ 'required', 'string'],
            'password' => [ 'required', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'identifier.required'=> 'Field is required',
            'identifier.string'=> 'Field must be string',
            'password.required'=> 'Field is required',
            'password.string'=> 'Field must be string',

//            'image.image'               =>'Choose a correct file according to image extensions',
        ];
    }
}
