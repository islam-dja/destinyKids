<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'wilaya' => 'required|string|max:255',
            'commune' => 'required|string|max:255',
            'address' => 'required|string',
            'postal_code' => 'nullable|string|max:10',
            'notes' => 'nullable|string|max:1000',
        ];
    }
}
