<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'age_group_id',
        'name',
        'slug',
        'description',
        'price',
        'compare_at_price',
        'stock',
        'sku',
        'barcode',
        'tags',
        'is_featured',
        'is_visible',
        'images',
        'main_image',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'stock' => 'integer',
        'is_featured' => 'boolean',
        'is_visible' => 'boolean',
        'tags' => 'array',
        'images' => 'array',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the age group that owns the product.
     */
    public function ageGroup()
    {
        return $this->belongsTo(AgeGroup::class);
    }

    /**
     * Scope a query to only include visible products.
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    /**
     * Scope a query to only include featured products.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include in-stock products.
     */
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    /**
     * Scope a query to search products.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('sku', 'like', "%{$search}%");
        });
    }

    /**
     * Get the sale percentage if on sale.
     */
    public function getSalePercentageAttribute()
    {
        if ($this->compare_at_price && $this->compare_at_price > $this->price) {
            return round((($this->compare_at_price - $this->price) / $this->compare_at_price) * 100);
        }
        
        return 0;
    }

    /**
     * Check if product is on sale.
     */
    public function getIsOnSaleAttribute()
    {
        return $this->compare_at_price && $this->compare_at_price > $this->price;
    }

    /**
     * Check if product is low in stock.
     */
    public function getIsLowStockAttribute()
    {
        return $this->stock > 0 && $this->stock <= 10;
    }

    /**
     * Check if product is out of stock.
     */
    public function getIsOutOfStockAttribute()
    {
        return $this->stock <= 0;
    }
}