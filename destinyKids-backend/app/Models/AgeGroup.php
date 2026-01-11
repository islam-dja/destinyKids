<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgeGroup extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'min_age',
        'max_age',
        'description',
        'order',
    ];

    /**
     * Get the products for the age group.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Scope a query to order by order column.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }

    /**
     * Get the age range as a string.
     */
    public function getAgeRangeAttribute()
    {
        if ($this->min_age && $this->max_age) {
            return "{$this->min_age}-{$this->max_age} years";
        } elseif ($this->min_age) {
            return "{$this->min_age}+ years";
        } elseif ($this->max_age) {
            return "Up to {$this->max_age} years";
        }
        
        return $this->name;
    }
}