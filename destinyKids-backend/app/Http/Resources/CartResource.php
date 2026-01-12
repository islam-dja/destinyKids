<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $items = CartItemResource::collection($this->whenLoaded('items'));
        $total = $items->sum(function ($item) {
            return $item->total_price ?? 0; // Access property from resource if possible, but safer to recalculate or rely on loaded product
            // Wait, accessing specialized property on resource object in collection map might be tricky if not standardized.
            // Let's rely on the underlying model relations loaded in the service.
            // $item is a CartItemResource. 
            // Actually, in a resource, $this is the model.
            // But here $items is a collection of resources.
            // Let's recalculate simply here to be safe and robust.
        });
        
        // Better way for total:
        $totalAmount = $this->items->sum(function ($cartItem) {
             return $cartItem->product ? $cartItem->product->price * $cartItem->quantity : 0;
        });

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'session_id' => $this->session_id,
            'status' => $this->status,
            'items' => $items,
            'total_amount' => $totalAmount,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
