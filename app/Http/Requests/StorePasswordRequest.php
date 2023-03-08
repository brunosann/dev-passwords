<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'custom_fields' => ['nullable', 'array'],
            'custom_fields.*.name' => ['required', 'string'],
            'custom_fields.*.value' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'custom_fields.*.name' => [
                'required' => 'O nome do campo é obrigatório.'
            ],
            'custom_fields.*.value' => [
                'required' => 'O valor do campo é obrigatório.'
            ],
        ];
    }
}
