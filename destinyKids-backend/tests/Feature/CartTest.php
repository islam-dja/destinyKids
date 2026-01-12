<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_add_item_to_cart()
    {
        $product = Product::factory()->create(['price' => 100]);
        $guestToken = 'test-token-' . uniqid();

        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.items.0.product.id', $product->id)
                 ->assertJsonPath('data.items.0.quantity', 1);
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 1
        ]);
    }

    public function test_guest_can_view_cart()
    {
        $product = Product::factory()->create();
        $guestToken = 'test-token-' . uniqid();
        
        // Add item first to establish session/cart
        $this->withHeader('X-Guest-Token', $guestToken)
             ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->getJson('/api/v1/cart');

        $response->assertStatus(200)
                 ->assertJsonPath('data.items.0.quantity', 2);
    }

    public function test_guest_can_update_cart_item()
    {
        $product = Product::factory()->create();
        $guestToken = 'test-token-' . uniqid();
        
        // Add item
        $addResponse = $this->withHeader('X-Guest-Token', $guestToken)
                            ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
        
        $itemId = $addResponse->json('data.items.0.id');

        // Update item
        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->patchJson("/api/v1/cart/update/{$itemId}", [
            'quantity' => 5,
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.items.0.quantity', 5);
        
        $this->assertDatabaseHas('cart_items', [
            'id' => $itemId,
            'quantity' => 5
        ]);
    }

    public function test_guest_can_remove_item_from_cart()
    {
        $product = Product::factory()->create();
        $guestToken = 'test-token-' . uniqid();
        
        // Add item
        $addResponse = $this->withHeader('X-Guest-Token', $guestToken)
                            ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
        
        $itemId = $addResponse->json('data.items.0.id');

        // Remove item
        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->deleteJson("/api/v1/cart/remove/{$itemId}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('cart_items', ['id' => $itemId]);
    }

    public function test_authenticated_user_can_manage_cart()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 3,
        ]);

        $response->assertStatus(200);
        
        $this->assertDatabaseHas('carts', [
            'user_id' => $user->id,
        ]);
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 3
        ]);
    }
}
