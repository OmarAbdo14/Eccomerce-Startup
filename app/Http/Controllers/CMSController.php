<?php

namespace App\Http\Controllers;

use App\Http\Traits\GeneralTrait;
use App\Http\Traits\APIsTrait;
use Illuminate\Http\Request;
use App\Models\Content;
use Illuminate\Support\Facades\Lang;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;


class CMSController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function returnViewWithLang() {
        $data = [];
        foreach (LaravelLocalization::getSupportedLocales() as $localeCode => $properties) {
            $url = LaravelLocalization::getLocalizedURL($localeCode, null, [], true);
            $data[$localeCode] = ['properties'=>$properties, 'url'=>$url];
        }
        $data['current_lang'] = LaravelLocalization::setLocale();
        return view('app')->with('data', $data);
    }
    
    public function getContent() {
        $data = [
            'login_form_title'=> Lang::get('content.login_form_title'),
            'login_form_identifier'=> trans('content.login_form_identifier'),
            'login_form_password'=> __('content.login_form_password'),
            'login_form_submit'=> __('content.login_form_submit'),
            'dashboard_title'=> __('content.dashboard_title'),
            'quarantine_status_normal'=> __('content.quarantine_status_normal'),
            'quarantine_status_outdoor'=> __('content.quarantine_status_outdoor'),
            'quarantine_status_unpaired'=> __('content.quarantine_status_unpaired'),
            'quarantine_status_offline'=> __('content.quarantine_status_offline'),
            'quarantine_violations_count'=> __('content.quarantine_violations_count'),
            'quarantine_modal_label'=> __('content.quarantine_modal_label'),
            'quarantine_modal_name'=> __('content.quarantine_modal_name'),
            'quarantine_modal_bracelet_ID'=> __('content.quarantine_modal_bracelet_ID'),
            'quarantine_modal_start_date'=> __('content.quarantine_modal_start_date'),
            'quarantine_modal_remaining_quarantine_days'=> __('content.quarantine_modal_remaining_quarantine_days'),
            'quarantine_modal_status'=> __('content.quarantine_modal_status'),
            'quarantine_modal_violations_count'=> __('content.quarantine_modal_violations_count'),
            'quarantine_modal_email'=> __('content.quarantine_modal_email'),
            'quarantine_modal_home_address'=> __('content.quarantine_modal_home_address'),
            'quarantine_modal_birth_date'=> __('content.quarantine_modal_birth_date'),
            'quarantine_modal_phone_number'=> __('content.quarantine_modal_phone_number'),
            'search_placeholder'=> __('content.search_placeholder'),
            'quarantines_table_user'=> __('content.quarantines_table_user'),
            'quarantines_table_bracelet_ID'=> __('content.quarantines_table_bracelet_ID'),
            'quarantines_table_start_date'=> __('content.quarantines_table_start_date'),
            'quarantines_table_remaining_quarantine_days'=> __('content.quarantines_table_remaining_quarantine_days'),
            'quarantines_table_actions'=> __('content.quarantines_table_actions'),
            'notifications_title'=> __('content.notifications_title'),

        ];
        if($data) {
            return $this->returnData('content', $data, 'content has been returned successfully');
        } else {
            return $this->returnError('There is no content', 'S003');
        }
    }

    
    public function showSections () {
        $sections = Content::all();
        return view('cms.sections', ['sections'=>$sections]);
    }
    
    public function getContenta() {
        $data = [
            'login_form_title'=> Lang::get('content.login_form_title'),
            'login_form_identifier'=> trans('content.login_form_identifier'),
            'login_form_password'=> __('content.login_form_password'),
            'login_form_submit'=> __('content.login_form_submit'),
            'dashboard_title'=> __('content.dashboard_title'),
            'quarantine_status_normal'=> __('content.quarantine_status_normal'),
            'quarantine_status_outdoor'=> __('content.quarantine_status_outdoor'),
            'quarantine_status_unpaired'=> __('content.quarantine_status_unpaired'),
            'quarantine_status_offline'=> __('content.quarantine_status_offline'),
            'quarantine_violations_count'=> __('content.quarantine_violations_count'),
            'quarantine_modal_label'=> __('content.quarantine_modal_label'),
            'quarantine_modal_name'=> __('content.quarantine_modal_name'),
            'quarantine_modal_bracelet_ID'=> __('content.quarantine_modal_bracelet_ID'),
            'quarantine_modal_start_date'=> __('content.quarantine_modal_start_date'),
            'quarantine_modal_remaining_quarantine_days'=> __('content.quarantine_modal_remaining_quarantine_days'),
            'quarantine_modal_status'=> __('content.quarantine_modal_status'),
            'quarantine_modal_violations_count'=> __('content.quarantine_modal_violations_count'),
            'quarantine_modal_email'=> __('content.quarantine_modal_email'),
            'quarantine_modal_home_address'=> __('content.quarantine_modal_home_address'),
            'quarantine_modal_birth_date'=> __('content.quarantine_modal_birth_date'),
            'quarantine_modal_phone_number'=> __('content.quarantine_modal_phone_number'),
            'search_placeholder'=> __('content.search_placeholder'),
            'quarantines_table_user'=> __('content.quarantines_table_user'),
            'quarantines_table_bracelet_ID'=> __('content.quarantines_table_bracelet_ID'),
            'quarantines_table_start_date'=> __('content.quarantines_table_start_date'),
            'quarantines_table_remaining_quarantine_days'=> __('content.quarantines_table_remaining_quarantine_days'),
            'quarantines_table_actions'=> __('content.quarantines_table_actions'),

        ];
        if($data) {
            return $this->returnData('content', $data, 'content has been returned successfully');
        } else {
            return $this->returnError('There is no content', 'S003');
        }
    }
    
    // array contains inputs of every section with input types
    public $sections = [
        'footer'=>[
            'text'=>[
                'column1Title'=>'required|string',
                'column2Title'=>'required|string',
                'column3Title'=>'required|string',
                'column3Desc1'=>'required|string',
                'column3Desc2'=>'required|string',
            ],
            'links'=>[
                'Login'=>['text'=>'required|url', 'url'=>'required|url',],
                'homeQuarantine'=>['text'=>'required|url', 'url'=>'required|url',],
                'contactUs'=>['text'=>'required|url', 'url'=>'required|url',],
                'logout'=>['text'=>'required|url', 'url'=>'required|url',],
                'allNotifications'=>['text'=>'required|url', 'url'=>'required|url',],
                'dashboard'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'navbar'=> [
            'text'=> [
                'logo'=>'required|string',
            ],
            'links'=>[
                'homeQuarantine'=>['text'=>'required|url', 'url'=>'required|url',],
                'contactus'=>['text'=>'required|url', 'url'=>'required|url',],
                'login'=>['text'=>'required|url', 'url'=>'required|url',],
                'logout'=>['text'=>'required|url', 'url'=>'required|url',],
                'allNotifications'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'login_header'=>[
            'text'=>[
                'title'=>'required|string',
            ],
            'file'=>[
                'background'=>'required|file|image|mimes:jpg,jpeg,png,svg,gif|max:5000',
            ],
        ],
        'login_form'=>[
            'text'=>[
                'title'=>'required|string',
            ],
            'inputs'=>[
                'identifier'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'password'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'sidebar'=>[
            'text'=>[
                'title'=>'required|string',
            ],
            'links'=>[
                'accountsManagement'=>['text'=>'required|url', 'url'=>'required|url',],
                'addAccount'=>['text'=>'required|url', 'url'=>'required|url',],
                'geofencesManagement'=>['text'=>'required|url', 'url'=>'required|url',],
                'addGeofence'=>['text'=>'required|url', 'url'=>'required|url',],
                'geofencesDashboard'=>['text'=>'required|url', 'url'=>'required|url',],
                'scenariosManagement'=>['text'=>'required|url', 'url'=>'required|url',],
                'addScenario'=>['text'=>'required|url', 'url'=>'required|url',],
                'scenariosDashboard'=>['text'=>'required|url', 'url'=>'required|url',],
                'notifications'=>['text'=>'required|url', 'url'=>'required|url',],
                'settings'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'accounts_managementSystem'=>[
            'text'=>[
                'pageTitle'=>'required|string',
                'searchPlaceholder'=>'required|string',
                'cols'=>'required|string',
            ],
            'links'=>[
                'edit'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'add_account'=>[
            'text'=>[
                'title'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'fullName'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'userName'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'emailAddress'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'password'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'image'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'update_account'=> [
            'text'=>[
                'title'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'fullName'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'userName'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'emailAddress'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'password'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'image'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'geofences_managementSystem'=>[
            'text'=>[
                'pageTitle'=>'required|string',
                'searchPlaceholder'=>'required|string',
                'cols'=>'required|string',
            ],
            'links'=>[
                'edit'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'add_geofence'=>[
            'text'=>[
                'title'=>'required|string',
                'pointsList'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'name'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geo_ID'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_location_type'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'signature'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
//                'capacity_limit'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_type'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'radius'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'update_geofence'=> [
            'text'=>[
                'title'=>'required|string',
                'pointsList'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'name'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geo_ID'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_location_type'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'signature'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
//                'capacity_limit'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_type'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'radius'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'scenarios_managementSystem'=>[
            'text'=>[
                'pageTitle'=>'required|string',
                'searchPlaceholder'=>'required|string',
                'cols'=>'required|string',
            ],
            'links'=>[
                'edit'=>['text'=>'required|url', 'url'=>'required|url',],
            ],
        ],
        'add_scenario'=>[
            'text'=>[
                'title'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'name'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_type_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'capacity_limit'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'action_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'update_scenario'=> [
            'text'=>[
                'title'=>'required|string',
                'button'=>'required|string',
            ],
            'inputs'=>[
                'name'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'geofence_type_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'capacity_limit'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
                'action_id'=>['name'=>'required|string', 'placeholder'=>'required|string', 'type'=>'required|string',],
            ],
        ],
        'notifications'=>[
            'text'=>[
                'title'=>'required|string',
            ],
        ],
        'settings'=>[
            'text'=>[
                'title'=>'required|string',
            ],
        ],
    ];

    public function showSectionForm ($id) {
        $section = Content::find($id);

        // convert data into associative array
        $data = json_decode($section->section_content, true);

        // return section data and section of same name in sections array
        return view('cms.form', ['id'=>$section->id, 'section_name'=>$section->section_name, 'data'=>$data, 'sectionInputTypes'=>$this->sections[$section->section_name],]);
    }

    public function updateSection (Request $request, $id) {
        $section = Content::find($id);
        $sectionInputs = $this->sections[$section->section_name];
        foreach ($sectionInputs as $type=>$inputs) {
            $inputType = $type;
            $$inputType = $inputs;

            // get array contains arrays of inputs of each section type
            $data[]= $$inputType;
        }

        $validated = [];
        if (count($data)>1) { // There's multiple input types in section
            for ($i=count($data)-1;$i>0;$i--) {
                // Merge the data inputs in one array
                $validated += array_merge($data[$i],$data[$i-1]);
            }
        } else { // There's one inputs type in section
            $validated = $data[0];
        }
        $validated = $request->validate($validated);
        if (array_key_exists('file', $sectionInputs)) {
            foreach ($validated as $key => $input) {
                if($input!=null) {
                    if(is_file($input)) {
                        $path = $this->saveImage($input, 'public/images/cms/');
                        $validated[$key] = $path;
                    }
                }
            }
        }

        Content::where('id',$id)->update(['section_content'=>$validated]);

        return redirect()->route('cms.sections');
    }
}
