<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\WholesaleInquiry;
use App\Notifications\NewWholesaleInquiryNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class WholesaleInquiryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test public inquiry submission success.
     */
    public function test_can_submit_wholesale_inquiry_publicly(): void
    {
        Notification::fake();

        $data = [
            'company_name' => 'Toy World',
            'contact_person' => 'John Doe',
            'email' => 'john@toyworld.com',
            'phone' => '+213123456789',
            'business_type' => 'retailer',
            'message' => 'Interested in wholesale prices for winter collections.'
        ];

        $response = $this->postJson('/api/v1/wholesale/inquiry', $data);

        $response->assertStatus(201)
            ->assertJsonPath('data.company_name', 'Toy World');

        $this->assertDatabaseHas('wholesale_inquiries', [
            'email' => 'john@toyworld.com',
            'status' => 'pending'
        ]);

        Notification::assertSentTo(
            new \Illuminate\Notifications\AnonymousNotifiable, 
            NewWholesaleInquiryNotification::class
        );
    }

    /**
     * Test public inquiry submission validation error.
     */
    public function test_public_inquiry_submission_requires_mandatory_fields(): void
    {
        $response = $this->postJson('/api/v1/wholesale/inquiry', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['company_name', 'contact_person', 'email', 'phone', 'message']);
    }

    /**
     * Test admin can list inquiries.
     */
    public function test_admin_can_list_inquiries(): void
    {
        WholesaleInquiry::factory()->count(5)->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->getJson('/api/v1/admin/wholesale/inquiries');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }

    /**
     * Test manager can list inquiries.
     */
    public function test_manager_can_list_inquiries(): void
    {
        WholesaleInquiry::factory()->count(3)->create();
        $manager = User::factory()->create(['role' => 'manager']);

        $response = $this->actingAs($manager)->getJson('/api/v1/admin/wholesale/inquiries');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    /**
     * Test customer cannot list inquiries.
     */
    public function test_customer_cannot_list_inquiries(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer)->getJson('/api/v1/admin/wholesale/inquiries');

        $response->assertStatus(403);
    }

    /**
     * Test admin can update inquiry status.
     */
    public function test_admin_can_update_inquiry_status(): void
    {
        $inquiry = WholesaleInquiry::create([
            'company_name' => 'Toy Store',
            'contact_person' => 'Jane Smith',
            'email' => 'jane@toystore.com',
            'phone' => '123456',
            'message' => 'Hello',
            'status' => 'pending'
        ]);

        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->patchJson("/api/v1/admin/wholesale/inquiries/{$inquiry->id}", [
            'status' => 'reviewed',
            'admin_notes' => 'Looking good.'
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.status', 'reviewed');

        $this->assertDatabaseHas('wholesale_inquiries', [
            'id' => $inquiry->id,
            'status' => 'reviewed',
            'admin_notes' => 'Looking good.'
        ]);
    }

    /**
     * Test bulk update functionality.
     */
    public function test_admin_can_bulk_update_inquiries(): void
    {
        $inquiries = WholesaleInquiry::factory()->count(3)->create(['status' => 'pending']);
        $ids = $inquiries->pluck('id')->toArray();
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->postJson('/api/v1/admin/wholesale/inquiries/bulk-update', [
            'ids' => $ids,
            'status' => 'contacted'
        ]);

        $response->assertStatus(200);

        foreach ($ids as $id) {
            $this->assertDatabaseHas('wholesale_inquiries', [
                'id' => $id,
                'status' => 'contacted'
            ]);
        }
    }

    /**
     * Test export functionality.
     */
    public function test_admin_can_export_inquiries(): void
    {
        WholesaleInquiry::factory()->count(2)->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/api/v1/admin/wholesale/inquiries/export');

        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'text/csv; charset=utf-8');
    }

    /**
     * Test admin can convert inquiry to B2B user.
     */
    public function test_admin_can_convert_inquiry_to_wholesale_user(): void
    {
        $inquiry = WholesaleInquiry::factory()->create(['status' => 'pending']);
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->postJson("/api/v1/admin/wholesale/inquiries/{$inquiry->id}/convert", [
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('users', [
            'email' => $inquiry->email,
            'role' => 'wholesale'
        ]);

        $this->assertDatabaseHas('wholesale_inquiries', [
            'id' => $inquiry->id,
            'status' => 'converted'
        ]);
    }

    /**
     * Test admin can view wholesale stats.
     */
    public function test_admin_can_view_wholesale_stats(): void
    {
        WholesaleInquiry::factory()->count(5)->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->getJson('/api/v1/admin/wholesale/stats');

        $response->assertStatus(200)
            ->assertJsonPath('data.total_inquiries', 5);
    }
}
