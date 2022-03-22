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
            'identifier' => [ 'required', ],
            'password' => [ 'required'],
        ];
    }


    public function messages()
    {
        return [
            'identifier.required'=> 'Field is required',
            'password.required'=> 'Field is required',

//            'image.image'               =>'Choose a correct file according to image extensions',
        ];
    }
}
