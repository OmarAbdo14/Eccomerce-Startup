<?php

namespace App\Models\Admin;

use App\Models\ServiceProvider\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'image',
        'created_at', 'updated_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function products() {
        return $this->hasMany(Product::class, 'product_type_id');
    }
}
