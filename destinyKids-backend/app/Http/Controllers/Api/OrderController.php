<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends BaseController
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items')
            ->latest()
            ->paginate(10);

        return $this->success(
            OrderResource::collection($orders)->response()->getData(true),
            'Orders retrieved successfully.'
        );
    }

    /**
     * Display the specified order.
     */
    public function show(Request $request, $id)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->with('items')
            ->findOrFail($id);

        return $this->success(
            new OrderResource($order),
            'Order retrieved successfully.'
        );
    }
}

