<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class BaseController extends Controller
{
    // `ApiResponse` is a helper class with static methods, not a trait.

    /**
     * API version
     */
    protected $apiVersion = 'v1';

    /**
     * Get authenticated user
     */
    protected function user()
    {
        return auth()->user();
    }

    /**
     * Get authenticated user ID
     */
    protected function userId()
    {
        return auth()->id();
    }

    /**
     * Check if user is authenticated
     */
    protected function isAuthenticated()
    {
        return auth()->check();
    }

    /**
     * Validate request with custom error response
     */
    protected function validateRequest(Request $request, array $rules, array $messages = [])
    {
        $validator = validator($request->all(), $rules, $messages);
        
        if ($validator->fails()) {
            return ApiResponse::validationError($validator->errors());
        }
        
        return null;
    }
}