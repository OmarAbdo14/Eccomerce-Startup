<?php

namespace App\Http\Requests\admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAdminRequest extends FormRequest
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
            'username' => "required|string|unique:admins,username,$this->id",
            'permissions' => [ 'required', ],
            // 'password' => [ 'nullable', 'string'],
            'email' => [ 'nullable', 'email', Rule::unique('admins', 'email')->ignore($this->id, 'id'), ],
            'image' => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'email.required'=> 'Field is required',
            'email.email'=> 'Field must be an email',
            'email.unique'=> "Field must be unique $this->id",

            'full_name.required'=> 'Field is required',
            'full_name.string'=> 'Field must be string',

            'username.required'=> 'Field is required',
            'username.string'=> 'Field must be string',
            'username.unique'=> "Field must be unique $this->id",

            'permissions.required'=> 'Field is required',

//            'image.image'               =>'Choose a correct file according to image extensions',
        ];
    }
}
