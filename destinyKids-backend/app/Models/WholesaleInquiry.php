<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WholesaleInquiry extends Model
{
    use HasFactory;
    const STATUS_PENDING = 'pending';
    const STATUS_REVIEWED = 'reviewed';
    const STATUS_CONTACTED = 'contacted';
    const STATUS_REJECTED = 'rejected';
    const STATUS_CONVERTED = 'converted';

    protected $fillable = [
        'company_name',
        'contact_person',
        'email',
        'phone',
        'business_type',
        'message',
        'status',
        'admin_notes',
        'user_id',
    ];
}
