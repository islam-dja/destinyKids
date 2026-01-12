<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'description' => $this->description,
            'short_description' => $this->short_description,
            
            // Pricing
            'price' => (float) $this->price,
            'compare_at_price' => $this->compare_price ? (float) $this->compare_price : null,
            'has_discount' => $this->is_on_sale,
            'discount_percentage' => $this->sale_percentage,
            
            // Stock
            'stock_status' => $this->is_out_of_stock ? 'out_of_stock' : ($this->is_low_stock ? 'low_stock' : 'in_stock'),
            'stock_quantity' => $this->when($this->track_stock, $this->stock_quantity),
            
            // Metadata
            'is_new' => $this->created_at->diffInDays(now()) < 30,
            'is_featured' => $this->is_featured,
            
            // Images
            'main_image' => $this->main_image,
            'images' => $this->images,
            
            // Relationships
            'category' => $this->whenLoaded('category', function () {
                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                ];
            }),
            
            'age_group' => $this->whenLoaded('ageGroup', function () {
                return [
                    'id' => $this->ageGroup->id,
                    'name' => $this->ageGroup->name,
                    'slug' => $this->ageGroup->slug,
                ];
            }),
            
            // SEO
            'meta' => [
                'title' => $this->meta_title,
                'description' => $this->meta_description,
            ],
            
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
