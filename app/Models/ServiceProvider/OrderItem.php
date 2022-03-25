<?php

namespace App\Models\ServiceProvider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'item_name', 'item_price', 'item_id',
//        'item_data',
        'created_at', 'updated_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function order() {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
