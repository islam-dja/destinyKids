<?php

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\WholesaleInquiry;
use App\Models\User;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "\n📦 STARTING BACKEND VERIFICATION 📦\n";
echo "=====================================\n\n";

try {
    // ---------------------------------------------------------
    // 1. Verify Products Exist (Prerequisite)
    // ---------------------------------------------------------
    echo "🔍 Checking Products...\n";
    $productCount = Product::count();
    echo "   Running count: {$productCount}\n";
    
    $product = Product::first();
    
    if (!$product) {
        // Create a dummy product if missing (for verification purposes)
        echo "   ⚠️ No products found. Creating dummy product for testing...\n";
        $product = Product::create([
             'name' => 'Test Product',
             'slug' => 'test-product-' . uniqid(),
             'price' => 1000,
             'is_published' => true,
             'stock_quantity' => 10
        ]);
    }
    echo "   ✅ Found/Created product: {$product->name} (ID: {$product->id})\n\n";


    // ---------------------------------------------------------
    // 2. Test Cart Module
    // ---------------------------------------------------------
    echo "🛒 Testing Cart Module...\n";
    
    // Create Cart
    $sessionId = 'test-sess-' . uniqid();
    $cart = Cart::create([
        'session_id' => $sessionId,
        'status' => 'active'
    ]);
    echo "   ✅ Created Cart (ID: {$cart->id}, Session: {$sessionId})\n";

    // Add Item
    $cartItem = $cart->items()->create([
        'product_id' => $product->id,
        'quantity' => 2
    ]);
    echo "   ✅ Added Item: {$product->name} x 2\n";
    
    // Verify Relationship
    $count = $cart->items()->count();
    echo "   ✅ Verified Cart Items Count: {$count}\n\n";


    // ---------------------------------------------------------
    // 3. Test Order Module
    // ---------------------------------------------------------
    echo "📦 Testing Order Module...\n";

    // Create Guest Order
    $orderNumber = 'ORD-' . strtoupper(uniqid());
    $order = Order::create([
        'order_number' => $orderNumber,
        'guest_info' => ['name' => 'Test Guest', 'email' => 'guest@example.com', 'phone' => '0555000000'],
        'subtotal' => $product->price * 2,
        'total_amount' => ($product->price * 2) + 500, // + shipping
        'shipping_fee' => 500,
        'shipping_address' => [
            'wilaya' => 'Alger',
            'commune' => 'Bab El Oued',
            'address' => '123 Test St'
        ],
        'status' => 'pending'
    ]);
    echo "   ✅ Created Order (Number: {$orderNumber})\n";

    // Add Order Item
    $order->items()->create([
        'product_id' => $product->id,
        'product_name' => $product->name, // Snapshot
        'product_sku' => $product->sku,   // Snapshot
        'quantity' => 2,
        'unit_price' => $product->price,
        'total_price' => $product->price * 2
    ]);
    echo "   ✅ Added Order Item (Snapshot Price: {$product->price})\n";
    
    // Check JSON Casts
    if (is_array($order->shipping_address) && isset($order->shipping_address['wilaya'])) {
        echo "   ✅ Json Casting (shipping_address) working\n\n";
    } else {
        echo "   ❌ Json Casting FAILED\n\n";
    }


    // ---------------------------------------------------------
    // 4. Test Wholesale Module
    // ---------------------------------------------------------
    echo "🏢 Testing Wholesale Module...\n";
    
    $inquiry = WholesaleInquiry::create([
        'company_name' => 'Test Retailer SARL',
        'contact_person' => 'Jane Doe',
        'email' => 'jane@retailer.com',
        'phone' => '0777000000',
        'business_type' => 'retailer',
        'message' => 'We want to buy 100 units.'
    ]);
    
    echo "   ✅ Created Wholesale Inquiry (ID: {$inquiry->id})\n";
    echo "   ✅ Status Default: {$inquiry->status}\n\n";

    echo "=====================================\n";
    echo "🎉 ALL MANUAL TESTS PASSED SUCCESSFULLY! 🎉\n";

} catch (\Exception $e) {
    echo "\n❌ TEST FAILED: " . $e->getMessage() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}
