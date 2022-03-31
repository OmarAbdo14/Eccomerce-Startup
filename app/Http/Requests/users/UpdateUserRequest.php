<?php

namespace App\Http\Requests\users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'username' => [ 'required', 'string',  Rule::unique('users', 'username')->ignore($this->id, 'id'), ],
            'email' => [ 'required', 'email', Rule::unique('users', 'email')->ignore($this->id, 'id'), ],
            'password' => [ 'required', 'string', 'min:8'],
            'phone' => [ 'required', 'digits:11', ],
            'location_country' => [ 'required', 'string' ],
            'location_city' => [ 'required', 'string' ],
            'location_area' => [ 'required', 'string', ],
            'birth_date' => [ 'required', 'date', ],
            'gender' => [ 'required', 'string' ],
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

            'location_country.required'=> 'Field is required',
            'location_country.string'=> 'Field must be string',

            'location_city.required'=> 'Field is required',
            'location_city.string'=> 'Field must be string',

            'location_area.required'=> 'Field is required',
            'location_area.string'=> 'Field must be string',

            'birth_date.required'=> 'Field is required',
            'birth_date.date'=> 'Field must be date',

            'gender.required'=> 'Field is required',
            'gender.string'=> 'Field must be string',

            'image.image'               =>'Choose a correct file according to image extensions',
        ];
    }
}
