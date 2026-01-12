<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::published()->with(['category', 'ageGroup']);

        // Filtering
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('age_group')) {
            $query->whereHas('ageGroup', function ($q) use ($request) {
                $q->where('slug', $request->age_group);
            });
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        
        if (in_array($sort, ['price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        // Pagination
        $products = $query->paginate($request->input('per_page', 12));

        return ProductResource::collection($products);
    }

    /**
     * Display the specified product.
     */
    public function show(string $slug)
    {
        $product = Product::published()
            ->where('slug', $slug)
            ->with(['category', 'ageGroup'])
            ->first();

        if (!$product) {
            return $this->notFound('Product not found');
        }

        return $this->success(new ProductResource($product));
    }
}