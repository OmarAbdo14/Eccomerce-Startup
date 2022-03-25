<?php

namespace App\Models;

use App\Models\Admin\Geofence;
use App\Models\ServiceProvider\Order;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'username', 'email', 'password', 'firebase_token',
        'phone', 'location_country', 'location_city', 'location_area', 'birth_date', 'gender', 'image',
        'created_at', 'updated_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'remember_token',
        'created_at',
        'updated_at',
    ];

    public function orders() {
        return $this->belongsToMany(Order::class, 'user_orders');
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
