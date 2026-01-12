<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    private function getSessionId(Request $request)
    {
        // For stateless APIs, we can use a header token.
        // For stateful (web-like) APIs, we use Laravel's session.
        if ($request->header('X-Guest-Token')) {
            return $request->header('X-Guest-Token');
        }

        if ($request->hasSession()) {
            $sessionId = $request->session()->getId();
            if ($sessionId) {
                return $sessionId;
            }
        }

        // Fallback for cases where session is not started or we want a stable ID
        return 'guest_' . md5($request->ip() . $request->userAgent());
    }

    public function index(Request $request)
    {
        $cart = $this->cartService->getCart($request->user(), $this->getSessionId($request));
        return new CartResource($cart);
    }

    public function store(AddToCartRequest $request)
    {
        $cart = $this->cartService->addToCart(
            $request->user(),
            $this->getSessionId($request),
            $request->validated()
        );

        return new CartResource($cart);
    }

    public function update(UpdateCartItemRequest $request, $itemId)
    {
        $cart = $this->cartService->updateItem(
            $request->user(),
            $this->getSessionId($request),
            $itemId,
            $request->validated()['quantity']
        );

        return new CartResource($cart);
    }

    public function destroy(Request $request, $itemId)
    {
        $cart = $this->cartService->removeItem(
            $request->user(),
            $this->getSessionId($request),
            $itemId
        );

        return new CartResource($cart);
    }

    public function clear(Request $request)
    {
        $cart = $this->cartService->clearCart($request->user(), $this->getSessionId($request));
        return new CartResource($cart);
    }
}
