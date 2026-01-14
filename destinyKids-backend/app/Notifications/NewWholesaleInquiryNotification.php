<?php

namespace App\Notifications;

use App\Models\WholesaleInquiry;
use App\Notifications\Channels\WhatsAppChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewWholesaleInquiryNotification extends Notification
{
    use Queueable;

    protected $inquiry;

    /**
     * Create a new notification instance.
     */
    public function __construct(WholesaleInquiry $inquiry)
    {
        $this->inquiry = $inquiry;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [WhatsAppChannel::class];
    }

    /**
     * Get the WhatsApp representation of the notification.
     */
    public function toWhatsApp(object $notifiable): string
    {
        return "New Wholesale Inquiry!\n" .
               "Company: {$this->inquiry->company_name}\n" .
               "Contact: {$this->inquiry->contact_person}\n" .
               "Email: {$this->inquiry->email}\n" .
               "Phone: {$this->inquiry->phone}\n" .
               "Message: " . substr($this->inquiry->message, 0, 100) . "...";
    }
}
