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
            'name'                   =>[ 'required', 'string' ],
            'username'               =>[ 'required', 'string', Rule::unique('users', 'username')->ignore($this->id, 'id'), ],
            'email'                  =>[ 'nullable', 'email', Rule::unique('users', 'email')->ignore($this->id, 'id') ],
//            'nationality'            =>[ 'required', 'string' ],
            'formal_ID'              =>[ 'required', 'string', Rule::unique('users', 'formal_ID')->ignore($this->id, 'id'), ],
//            'home_address'           =>[ 'required', 'string' ],
//            'birth_date'             =>[ 'required', 'date' ],
            'geofences'              =>[ 'nullable', ],
            'phone'                  =>[ 'required', ],
            'image'                  =>[ 'nullable', ],
        ];
    }


    public function messages()
    {

        return [
            'name.required'             =>'Field is required',
            'name.string'               =>'Field must be string',

            'username.required'         =>'Field is required',
            'username.string'           =>'Field must be string',
            'username.unique'           =>'This username is exist',

            'email.string'              =>'Field must be an email',
            'email.unique'              =>'This email is exist',

//            'nationality'               =>'Choose one from the previous options',

            'formal_ID.required'        =>'Field is required',
            'formal_ID.string'          =>'Field must be string',
            'formal_ID.unique'          =>'This ID is exist',

//            'home_address.required'     =>'Field is required',
//            'home_address.string'       =>'Field must be string',
//
//            'birth_date.required'       =>'Field is required',
//            'birth_date.string'         =>'Field must be date',

            'phone.required'            =>'Field is required',

//            'image.image'               =>'Choose a correct file according to this extensions()',

        ];
    }
}
