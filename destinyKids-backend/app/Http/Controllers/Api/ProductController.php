<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        // Will be implemented in Phase 1
        return $this->success([], 'Products endpoint ready');
    }

    /**
     * Display the specified product.
     */
    public function show(string $slug)
    {
        // Will be implemented in Phase 1
        return $this->success(['slug' => $slug], 'Product detail endpoint ready');
    }
}