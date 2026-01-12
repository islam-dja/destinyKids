<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Create an order from the current cart.
     */
    public function createOrderFromCart($user, $sessionId, $data)
    {
        return DB::transaction(function () use ($user, $sessionId, $data) {
            $cart = $this->cartService->getCart($user, $sessionId);

            if ($cart->items->isEmpty()) {
                throw new \Exception('Cannot checkout with an empty cart.');
            }

            $subtotal = $cart->items->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            // For now, shipping fee is static or zero as per requirements
            $shippingFee = 0; 
            $totalAmount = $subtotal + $shippingFee;

            $order = Order::create([
                'order_number' => $this->generateOrderNumber(),
                'user_id' => $user ? $user->id : null,
                'guest_info' => $user ? null : [
                    'name' => $data['first_name'] . ' ' . $data['last_name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                ],
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'total_amount' => $totalAmount,
                'status' => Order::STATUS_PENDING,
                'payment_method' => Order::PAYMENT_METHOD_COD,
                'payment_status' => Order::PAYMENT_STATUS_UNPAID,
                'shipping_address' => [
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                    'wilaya' => $data['wilaya'],
                    'commune' => $data['commune'],
                    'address' => $data['address'],
                    'postal_code' => $data['postal_code'] ?? null,
                ],
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'product_sku' => $item->product->sku,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->product->price,
                    'total_price' => $item->quantity * $item->product->price,
                ]);

                // Update product stock if needed
                // $item->product->decrement('stock', $item->quantity);
            }

            // Clear the cart after successful order
            $this->cartService->clearCart($user, $sessionId);

            return $order->load('items');
        });
    }

    /**
     * Generate a unique order number.
     */
    protected function generateOrderNumber()
    {
        $prefix = 'ORD-';
        $year = date('Y');
        $random = strtoupper(Str::random(6));

        $orderNumber = $prefix . $year . '-' . $random;

        // Ensure uniqueness
        while (Order::where('order_number', $orderNumber)->exists()) {
            $random = strtoupper(Str::random(6));
            $orderNumber = $prefix . $year . '-' . $random;
        }

        return $orderNumber;
    }
}
