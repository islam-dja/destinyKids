<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WholesaleInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InquiryStatsController extends Controller
{
    /**
     * Get summary metrics for wholesale inquiries.
     */
    public function index()
    {
        $total = WholesaleInquiry::count();
        $statusCounts = WholesaleInquiry::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        $last7Days = WholesaleInquiry::where('created_at', '>=', now()->subDays(7))
            ->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_inquiries' => $total,
                'status_counts' => $statusCounts,
                'recent_7_days' => $last7Days,
                'conversion_rate' => 0, // TODO: Implement conversion logic
            ]
        ]);
    }
}
