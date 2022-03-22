<?php

    namespace App\Console;

    use App\Console\Commands\checkIoTStatus;

    use App\Console\Commands\checkUserAssociation;
    use App\Models\Admin\Geofence;
    use Illuminate\Console\Scheduling\Schedule;
    use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

    class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        checkIoTStatus::class,
        checkUserAssociation::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $max_allowed_unpairing_time = config('settings.max_allowed_unpairing_time');
        $schedule->command('IoT:checkStatus')->cron("*/1 * * * *")->runInBackground();
        $schedule->command('User:checkAssociation')->cron("*/1 * * * *")->runInBackground();
        // after calling the api with config('max_allowed_unpairing_time')
        $schedule->call(function () {
                $geofences = Geofence::all();
                while (true) {
                    event(new \App\Events\MessageSent($geofences));
                    sleep(3);
                }
            })
            ->everyMinute()
            ->runInBackground();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
