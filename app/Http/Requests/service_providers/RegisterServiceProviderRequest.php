<?php

namespace App\Http\Requests\service_providers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterServiceProviderRequest extends FormRequest
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
            'full_name' => [ 'required', 'string' ],
            'username' => [ 'required', 'string',  Rule::unique('service_providers', 'username'), ],
            'email' => [ 'required', 'email', Rule::unique('service_providers', 'email'), ],
            'password' => [ 'required', 'string', 'min:8'],
            'phone' => [ 'required', 'digits:11', ],
            'organization_name' => [ 'required', 'string' ],
            'organization_location' => [ 'required', 'string' ],
            'image' => [ 'nullable', 'image'],
        ];
    }


    public function messages()
    {
        return [
            'email.required'=> 'Field is required',
            'email.email'=> 'Field must be an email',
            'email.unique'=> 'This email is exist',

            'full_name.required'=> 'Field is required',
            'full_name.string'=> 'Field must be string',

            'username.required'=> 'Field is required',
            'username.string'=> 'Field must be string',
            'username.unique'=> 'This username is exist',

            'password.required'=> 'Field is required',
            'password.string'=> 'Field must be string',
            'password.min'=> 'Field must be at 8 character least',

            'phone.required'=> 'Field is required',
            'phone.digits'=> 'Field must be 11 digits',

            'organization_name.required'=> 'Field is required',
            'organization_name.string'=> 'Field must be string',

            'organization_location.required'=> 'Field is required',
            'organization_location.string'=> 'Field must be string',

            'image.image'               =>'Choose a correct file according to image extensions',
        ];
    }
}
