<?php

namespace App\Notifications\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class WhatsAppChannel
{
    /**
     * Send the given notification.
     */
    public function send($notifiable, Notification $notification)
    {
        if (!method_exists($notification, 'toWhatsApp')) {
            return;
        }

        $message = $notification->toWhatsApp($notifiable);
        $to = config('services.whatsapp.admin_number');

        // Logic to send WhatsApp message via API
        // For now, we simulate by logging
        Log::info("WhatsApp message to {$to}: {$message}");
    }
}
