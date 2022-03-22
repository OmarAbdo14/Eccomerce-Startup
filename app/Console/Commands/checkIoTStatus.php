<?php

namespace App\Console\Commands;

use App\Models\Admin\IOTDevice;
use App\Models\Admin\IOTDeviceRead;
use App\Models\Admin\Notification;
use App\Models\Admin\User;
use Illuminate\Console\Command;

class checkIoTStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'IoT:checkStatus';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change IoT Device status into offline if the last message sent was from 5 minutes or more';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $IoTDevices = IOTDevice::all();
        foreach ($IoTDevices as $IoTDevice) {
            $lastRead = $IoTDevice->IOTDeviceReads->last();
            $DB_TimeStamp = strtotime($lastRead->created_at);
            if(time() - $DB_TimeStamp > config('settings.max_allowed_time_for_IoT_reading')) {
                $IoTDevice->update([
                    'status'=>'offline',
                    'counter'=>0,
                ]);

                //create notification
                Notification::create([
                    'title' => 'IoT_device_status_has_been_changed',
                    'type' => 'notification',
                    'description' => "$IoTDevice->name is offline",
                    'image' => null,
                ]);
            }
        }
    }
}
