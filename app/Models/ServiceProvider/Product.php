<?php

namespace App\Models\ServiceProvider;

use App\Models\ServiceProvider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'desc', 'price', 'offer_percent', 'is_shipping',
        'rate', 'tags', 'service_provider_id', 'product_type_id', 'category_id', 'image',
        'created_at', 'updated_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function serviceProvider() {
        return $this->belongsTo(ServiceProvider::class, 'service_provider_id');
    }

    public function productType() {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
