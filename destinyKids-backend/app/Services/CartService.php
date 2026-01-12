<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class CartService
{
    /**
     * Get or create a cart for the user or session.
     */
    public function getCart($user, $sessionId)
    {
        if ($user) {
            $cart = Cart::firstOrCreate(
                ['user_id' => $user->id, 'status' => 'active'],
                ['session_id' => $sessionId]
            );
        } else {
            $cart = Cart::firstOrCreate(
                ['session_id' => $sessionId, 'status' => 'active'],
                ['user_id' => null]
            );
        }

        return $cart->load('items.product');
    }

    /**
     * Add an item to the cart.
     */
    public function addToCart($user, $sessionId, $data)
    {
        $cart = $this->getCart($user, $sessionId);
        $product = Product::findOrFail($data['product_id']);

        // Check if item already exists in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $data['quantity'];
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
            ]);
        }

        return $cart->fresh('items.product');
    }

    /**
     * Update an item in the cart.
     */
    public function updateItem($user, $sessionId, $itemId, $quantity)
    {
        $cart = $this->getCart($user, $sessionId);
        $cartItem = $cart->items()->findOrFail($itemId);

        $cartItem->update(['quantity' => $quantity]);

        return $cart->fresh('items.product');
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem($user, $sessionId, $itemId)
    {
        $cart = $this->getCart($user, $sessionId);
        $cartItem = $cart->items()->where('id', $itemId)->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return $cart->fresh('items.product');
    }

    /**
     * Clear the cart.
     */
    public function clearCart($user, $sessionId)
    {
        $cart = $this->getCart($user, $sessionId);
        $cart->items()->delete();
        
        return $cart->fresh('items.product');
    }
}
