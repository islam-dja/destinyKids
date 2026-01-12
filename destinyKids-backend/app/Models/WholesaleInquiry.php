<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WholesaleInquiry extends Model
{
    protected $fillable = [
        'company_name',
        'contact_person',
        'email',
        'phone',
        'business_type',
        'message',
        'status',
        'admin_notes',
    ];
}
