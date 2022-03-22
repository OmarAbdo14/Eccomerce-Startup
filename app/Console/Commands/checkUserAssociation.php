<?php

namespace App\Console\Commands;

use App\Models\Admin\Notification;
use App\Models\Admin\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class checkUserAssociation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'User:checkAssociation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if the user association is expired or not';

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
        $users = User::all();
        foreach ($users as $user) {
            // check if the user has an association and association is temporary
            if ($user->associationDetails && $user->associationDetails!=null && !$user->associationDetails->is_permnent) {
                if ($user->associationDetails->schedule!=null) {
                    $days = json_decode($user->associationDetails->schedule);
//                    $weekDays = collect([Carbon::SATURDAY, Carbon::SUNDAY, Carbon::MONDAY, Carbon::TUESDAY, Carbon::WEDNESDAY, Carbon::THURSDAY, Carbon::FRIDAY, ]);

                    if(in_array(Carbon::today()->format('l') , $days)) {
                        $user->associationDetails->update([
                            'is_associated_now'=>true,
                        ]);
                    } else {
                        $user->associationDetails->update([
                            'is_associated_now'=>false,
                        ]);
                    }

                    $associatedDay = $days->contains(Carbon::today());
                    if($associatedDay) {
                        $user->associationDetails->update([
                            'is_associated_now'=>true,
                        ]);
                    } else {
                        $user->associationDetails->update([
                            'is_associated_now'=>false,
                        ]);
                    }
                }

                if($user->associationDetails->start_time!=null && $user->associationDetails->end_time!=null) {
                    // check if the
                    $currentDate = Carbon::today();
                    $startDate = Carbon::parse($user->associationDetails->start_time)->format('Y-m-d H:i:s');
                    $endDate = Carbon::parse($user->associationDetails->end_time)->format('Y-m-d H:i:s');
                    if (($currentDate >= $startDate) && ($currentDate <= $endDate)){
                        $user->associationDetails->update([
                            'is_associated_now'=>true,
                        ]);
                    } else {
                        $user->associationDetails->update([
                            'is_associated_now'=>false,
                        ]);
                    }
                }

            }
        }
    }
}
