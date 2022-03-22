<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\settings\SaveSettingsRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class SettingsController extends Controller
{
    use APIsTrait;
    use GeneralTrait;


    public function getAllSettings()
    {
        $settings['current_lang'] = LaravelLocalization::setLocale();
        $settings['max_allowed_time_for_IoT_reading'] = config('settings.max_allowed_time_for_IoT_reading');
        $settings['work_start_time'] = config('settings.work_start_time');
        $settings['organization_name'] = config('settings.organization_name');
        $settings['organization_radius'] = config('settings.organization_radius');
        $settings['organization_coordinates'] = config('settings.organization_coordinates');

        if ($settings) {
            return $this-> returnData('settings', $settings, 'All settings has been returned successfully');
        } else {
            return $this-> returnError('there is not any setting', "S004");
        }
    }

    public function saveSettings(SaveSettingsRequest $request)
    {
//        file_put_contents(app()->environmentFilePath(), str_replace(
//            $key . '=' . env($request->),
//            $key . '=' . $request->,
//            file_get_contents(app()->environmentFilePath())
//        ));
//        $env = new DotenvEditor;
//        $env->changeEnv([
//            'DB_HOST' => $request['hostname'],
//            'DB_DATABASE' => $request['dbname'],
//            'DB_USERNAME' => $request['username'],
//            'DB_PASSWORD' => $request['dbpassword'],
//        ]);

        // edit in config
        if($request->max_allowed_time_for_IoT_reading)
            config(['settings.max_allowed_time_for_IoT_reading'=> $request->max_allowed_time_for_IoT_reading]);
        if($request->work_start_time)
            config(['settings.work_start_time'=> $request->work_start_time]);
        if($request->organization_name)
            config(['settings.organization_name'=> $request->organization_name]);
        if($request->organization_radius)
            config(['settings.organization_radius'=> $request->organization_radius]);
        if($request->organization_coordinates)
            config(['settings.organization_coordinates'=> $request->organization_coordinates]);

        // edit in settings.php file
        $text = '<?php return ' . var_export(config('settings'), true) . ';';
        $updateFile = file_put_contents(config_path('settings.php'), $text);

        if($updateFile) {
            return $this->returnSuccessMessage('settings has been changed successfully');
        } else {
            return $this->returnError('Something went wrong', 'S003');
        }
    }
}
