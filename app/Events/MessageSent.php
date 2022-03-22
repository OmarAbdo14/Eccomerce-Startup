<?php

namespace App\Events;

use App\Models\Admin\Geofence;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $geofences;
    public $associatedUsers;
    public $responsibleUsers;
    public $currentUsers;
    public $IOTDevice;
    public $scenarios;
    public $points_list;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($geofences)
    {
        $this->geofences = $geofences;
        foreach($geofences as $geofence) {
            $this->associatedUsers[] = $geofence->associatedUsers;
            $this->responsibleUsers[] = $geofence->responsibleUsers;
            $this->currentUsers[] = $geofence->currentUsers;
            $this->IOTDevice[] = $geofence->IOTDevice;
            $this->scenarios[] = $geofence->scenarios;
            $this->points_list[] = json_decode($geofence->points_list);
        }
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('my-channel');
    }

    public function broadcastAs()
    {
        return 'geofences';
    }
}
