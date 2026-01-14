<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWholesaleInquiryRequest;
use App\Http\Requests\UpdateWholesaleInquiryRequest;
use App\Http\Resources\WholesaleInquiryResource;
use App\Models\WholesaleInquiry;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class WholesaleController extends Controller
{
    /**
     * Display a listing of the resource (Admin/Manager).
     */
    public function index(Request $request)
    {
        $query = WholesaleInquiry::query();

        // Filtering by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by company, person or email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_person', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->latest()->paginate($request->get('limit', 15));

        return WholesaleInquiryResource::collection($inquiries);
    }

    /**
     * Store a newly created resource in storage (Public).
     */
    public function store(StoreWholesaleInquiryRequest $request)
    {
        $inquiry = WholesaleInquiry::create($request->validated());

        // Notify Admins/Managers via WhatsApp (simulated)
        \Illuminate\Support\Facades\Notification::route(
            \App\Notifications\Channels\WhatsAppChannel::class, 
            config('services.whatsapp.admin_number')
        )->notify(new \App\Notifications\NewWholesaleInquiryNotification($inquiry));

        return new WholesaleInquiryResource($inquiry);
    }

    /**
     * Display the specified resource (Admin/Manager).
     */
    public function show(WholesaleInquiry $wholesaleInquiry)
    {
        return new WholesaleInquiryResource($wholesaleInquiry);
    }

    /**
     * Update the specified resource in storage (Admin/Manager).
     */
    public function update(UpdateWholesaleInquiryRequest $request, WholesaleInquiry $wholesaleInquiry)
    {
        $wholesaleInquiry->update($request->validated());

        return new WholesaleInquiryResource($wholesaleInquiry);
    }

    /**
     * Remove the specified resource from storage (Admin/Manager).
     */
    public function destroy(WholesaleInquiry $wholesaleInquiry)
    {
        $wholesaleInquiry->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry deleted successfully'
        ]);
    }

    /**
     * Bulk update inquiry statuses (Admin/Manager).
     */
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:wholesale_inquiries,id',
            'status' => 'required|in:pending,reviewed,contacted,rejected',
        ]);

        WholesaleInquiry::whereIn('id', $request->ids)->update([
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiries updated successfully'
        ]);
    }

    /**
     * Export inquiries to CSV (Admin/Manager).
     */
    public function export()
    {
        $inquiries = WholesaleInquiry::all();
        $fileName = 'wholesale_inquiries_' . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = [
            'ID', 'Company Name', 'Contact Person', 'Email', 'Phone', 
            'Business Type', 'Message', 'Status', 'Admin Notes', 'Created At'
        ];

        $callback = function() use($inquiries, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($inquiries as $inquiry) {
                fputcsv($file, [
                    $inquiry->id,
                    $inquiry->company_name,
                    $inquiry->contact_person,
                    $inquiry->email,
                    $inquiry->phone,
                    $inquiry->business_type,
                    $inquiry->message,
                    $inquiry->status,
                    $inquiry->admin_notes,
                    $inquiry->created_at?->toDateTimeString(),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Convert an inquiry into a wholesale user (Admin/Manager).
     */
    public function convert(Request $request, WholesaleInquiry $wholesaleInquiry)
    {
        if ($wholesaleInquiry->status === WholesaleInquiry::STATUS_CONVERTED) {
            return response()->json([
                'status' => 'error',
                'message' => 'Inquiry already converted to wholesale account.'
            ], 422);
        }

        $request->validate([
            'password' => 'required|string|min:8',
        ]);

        // Create the wholesale user
        $user = \App\Models\User::create([
            'name' => $wholesaleInquiry->contact_person,
            'email' => $wholesaleInquiry->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => 'wholesale',
        ]);

        $wholesaleInquiry->update([
            'status' => WholesaleInquiry::STATUS_CONVERTED,
            'user_id' => $user->id,
            'admin_notes' => ($wholesaleInquiry->admin_notes ? $wholesaleInquiry->admin_notes . "\n" : "") . 
                             "Converted to wholesale user on " . now()->toDateTimeString(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry successfully converted to wholesale user.',
            'data' => [
                'user' => $user,
                'inquiry' => new WholesaleInquiryResource($wholesaleInquiry)
            ]
        ]);
    }
}
