<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeUpdateRequest extends FormRequest
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
            'companyId' => 'integer',
            'firstName' => 'string|max:50',
            'lastName' => 'string|max:50',
            'email' => 'string|email|max:50|unique:employees',
            'phone' => 'string|max:50|unique:employees',
        ];
    }
}
