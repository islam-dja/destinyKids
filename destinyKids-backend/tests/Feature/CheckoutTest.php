<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_guest_can_checkout_successfully()
    {
        $product = Product::factory()->create(['price' => 1000]);
        $guestToken = 'test-token-' . uniqid();

        // Add to cart
        $this->withHeader('X-Guest-Token', $guestToken)
             ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $checkoutData = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->safeEmail,
            'phone' => '0550112233',
            'wilaya' => 'Algiers',
            'commune' => 'Draria',
            'address' => 'Street 123',
            'notes' => 'Deliver after 5 PM',
        ];

        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->postJson('/api/v1/checkout', $checkoutData);

        $response->assertStatus(201)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.total_amount', "2000.00")
                 ->assertJsonPath('data.status', Order::STATUS_PENDING);

        $this->assertDatabaseHas('orders', [
            'total_amount' => 2000,
            'user_id' => null,
            'payment_method' => 'cod',
        ]);

        // Verify cart is cleared
        $cartResponse = $this->withHeader('X-Guest-Token', $guestToken)
                             ->getJson('/api/v1/cart');
        $cartResponse->assertJsonCount(0, 'data.items');
    }

    public function test_authenticated_user_can_checkout_successfully()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['price' => 500]);

        // Add to cart
        $this->actingAs($user)
             ->postJson('/api/v1/cart/add', [
            'product_id' => $product->id,
            'quantity' => 3,
        ]);

        $checkoutData = [
            'first_name' => $user->name,
            'last_name' => 'User',
            'email' => $user->email,
            'phone' => '0660112233',
            'wilaya' => 'Oran',
            'commune' => 'Center',
            'address' => 'Apartment 4B',
        ];

        $response = $this->actingAs($user)
                         ->postJson('/api/v1/checkout', $checkoutData);

        $response->assertStatus(201);

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'total_amount' => 1500,
        ]);
    }

    public function test_checkout_fails_with_empty_cart()
    {
        $guestToken = 'test-token-' . uniqid();

        $checkoutData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '0550112233',
            'wilaya' => 'Algiers',
            'commune' => 'Draria',
            'address' => 'Street 123',
        ];

        $response = $this->withHeader('X-Guest-Token', $guestToken)
                         ->postJson('/api/v1/checkout', $checkoutData);

        $response->assertStatus(422)
                 ->assertJsonPath('success', false)
                 ->assertJsonPath('message', 'Cannot checkout with an empty cart.');
    }

    public function test_checkout_validation_errors()
    {
        $response = $this->postJson('/api/v1/checkout', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['first_name', 'last_name', 'email', 'phone', 'wilaya', 'commune', 'address']);
    }
}
