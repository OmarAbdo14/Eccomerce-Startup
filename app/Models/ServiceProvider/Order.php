<?php

namespace App\Models\ServiceProvider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'status', 'del_date', 'price',
        'created_at', 'updated_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function users() {
        return $this->belongsToMany(Order::class, 'user_orders');
    }

    public function order_item() {
        return $this->hasMany(Order::class, 'order_id');
    }
}
