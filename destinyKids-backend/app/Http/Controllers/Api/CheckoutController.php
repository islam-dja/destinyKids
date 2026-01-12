<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\Request;

class CheckoutController extends BaseController
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Handle the checkout process.
     */
    public function store(CheckoutRequest $request)
    {
        try {
            $user = $request->user();
            $sessionId = $this->getSessionId($request);

            $order = $this->orderService->createOrderFromCart($user, $sessionId, $request->validated());

            return $this->success(
                new OrderResource($order),
                'Order placed successfully.',
                201
            );
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 422);
        }
    }

    private function getSessionId(Request $request)
    {
        if ($request->header('X-Guest-Token')) {
            return $request->header('X-Guest-Token');
        }

        if ($request->hasSession()) {
            $sessionId = $request->session()->getId();
            if ($sessionId) {
                return $sessionId;
            }
        }

        return 'guest_' . md5($request->ip() . $request->userAgent());
    }
}


