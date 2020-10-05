<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CompanyStoreRequest extends FormRequest
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
            'name' => 'required|string|max:50|unique:companies',
            'email' => 'required|string|email|unique:companies',
            'logo' => 'required|mimes:png|dimensions:man_width=100,man_height=100',
            'website' => 'required|string|unique:companies',
        ];
    }
}
