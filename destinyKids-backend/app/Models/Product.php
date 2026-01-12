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
        'sku',
        'short_description',
        'description',
        'price',
        'compare_price',
        'cost_price',
        'age_group',
        'stock_quantity',
        'low_stock_threshold',
        'track_stock',
        'is_featured',
        'is_published',
        'is_b2b_eligible',
        'b2b_price',
        'min_b2b_quantity',
        'weight_grams',
        'dimensions',
        'images',
        'main_image',
        'attributes',
        'meta_title',
        'meta_description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'compare_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'b2b_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'low_stock_threshold' => 'integer',
        'track_stock' => 'boolean',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'is_b2b_eligible' => 'boolean',
        'dimensions' => 'array',
        'images' => 'array',
        'attributes' => 'array',
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
     * Scope a query to only include published products.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
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
        return $query->where('stock_quantity', '>', 0);
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
        if ($this->compare_price && $this->compare_price > $this->price) {
            return round((($this->compare_price - $this->price) / $this->compare_price) * 100);
        }
        
        return 0;
    }

    /**
     * Check if product is on sale.
     */
    public function getIsOnSaleAttribute()
    {
        return $this->compare_price && $this->compare_price > $this->price;
    }

    /**
     * Check if product is low in stock.
     */
    public function getIsLowStockAttribute()
    {
        return $this->stock_quantity > 0 && $this->stock_quantity <= $this->low_stock_threshold;
    }

    /**
     * Check if product is out of stock.
     */
    public function getIsOutOfStockAttribute()
    {
        return $this->stock_quantity <= 0;
    }
}