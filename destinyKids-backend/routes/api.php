<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// API Version prefix
Route::prefix('v1')->group(function () {
    
    // Public routes (no authentication required)
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
            'service' => 'Destiny-KIDS API',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
        ]);
    });
    
    // CSRF token for Next.js (if needed for forms)
    Route::get('/csrf-token', function (Request $request) {
        return response()->json([
            'csrf_token' => csrf_token(),
        ]);
    });
    
    // Product routes (will be implemented in Phase 1)
    Route::prefix('products')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\ProductController::class, 'index']);
        Route::get('/{slug}', [\App\Http\Controllers\Api\ProductController::class, 'show']);
    });
    
    // Cart routes (will be implemented in Phase 1)
    Route::prefix('cart')->group(function () {
        Route::post('/add', [\App\Http\Controllers\CartController::class, 'store']);
        Route::patch('/update/{itemId}', [\App\Http\Controllers\CartController::class, 'update']);
        Route::delete('/remove/{itemId}', [\App\Http\Controllers\CartController::class, 'destroy']);
        Route::delete('/clear', [\App\Http\Controllers\CartController::class, 'clear']);
        Route::get('/', [\App\Http\Controllers\CartController::class, 'index']);
    });
    
    // Checkout routes (will be implemented in Phase 1)
    Route::prefix('checkout')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\CheckoutController::class, 'store']);
    });
    
    // Wholesale routes (will be implemented in Phase 2)
    Route::prefix('wholesale')->group(function () {
        Route::post('/inquiry', [\App\Http\Controllers\Api\WholesaleController::class, 'store']);
    });
    
    // Protected routes (authentication required)
    Route::middleware(['auth:sanctum'])->group(function () {
        // User routes
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        
        // Order routes (will be implemented in Phase 1)
        Route::prefix('orders')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\OrderController::class, 'index']);
            Route::get('/{id}', [\App\Http\Controllers\Api\OrderController::class, 'show']);
        });
        
        // Logout
        Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    });
    
    // Authentication routes (will be implemented later)
    Route::prefix('auth')->group(function () {
        Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
        Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
    });
});