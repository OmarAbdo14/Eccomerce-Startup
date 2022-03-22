<?php

namespace App\Http\Traits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

//use App\Http\Traits\APIsTrait;

trait GeneralTrait {
    use APIsTrait;

    public function saveFile($file,$path){
        $fileNameWithExt = $file->getClientOriginalName();

        // Delete old file
        $exists = Storage::disk('local')->exists($path.$fileNameWithExt);

        if ($exists) {
            Storage::delete( $path . $fileNameWithExt);
        }

        // Upload new file

        $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileNameToStore = $fileName.time().'.'.$extension;
        $path = $file->move($path , $fileNameToStore);

        return $path ;
    }

    public function logout(Request $request) {
//        auth()->logout();
//        return $this->returnSuccessMessage('Successfully logged out');
        $token = $request->header('auth_token');
        if ($token) {
            try {
                JWTAuth::setToken($token)->invalidate();
            } catch (TokenInvalidException $e) {
                return $this->returnError('', 'Invalid Token');
            }
            return $this->returnSuccessMessage('Logged out');
        } else {
            $this->returnError('', 'There is no token sent');
        }
    }

    public function passwordGenerator($model, $trow, $lenght=4, $prefix) {
        $kh_data = $model::orderBy('id', 'desc')->first();
        if(!$kh_data) {
            $kh_length = $lenght;
            $last_number = '';
        } else {
            $code_kh = substr($kh_data->$trow, strlen($prefix)+1);
            $kh_last_number = $code_kh;
            $increment_last_number = $kh_last_number+1;
            $last_number_length = strlen($increment_last_number);
            $kh_length = $lenght - $last_number_length;
            $last_number = $increment_last_number;
        }
        $khmer = "";
        for($i=0; $i<$kh_length;$i++) {
            $khmer.='0';
        }
        return $prefix.'-'.$khmer.$last_number;
    }

    public function search($model, $cols, $keyword) {
        foreach ($cols as $col) {
            $data = $model::where($col, 'like', '%'.$keyword.'%')->get();
            if(is_array($data))
                return $data;
        }
    }

    public function getCurrentLang() {

        return app()->getLocale();
    }

    public function sendNotificationToMobile ($tokens, $title, $message) {
        $SERVER_API_KEY = 'API SERVER KEY';
//        $token_1 = 'Test Token';
        $data = [
            "registration_ids" => $tokens,
            "notification" => [
                "type" => 'notification', // notification OR request
                "body" => [
                    'title' => $title, // notification OR request
                    'data' => $message // message OR url to be requested
                ],
                "sound"=> "default" // required for sound on ios
            ],
        ];
        $dataString = json_encode($data);
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        // send request to FCM
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
        $response = curl_exec($ch);

        dd($response);

    }
}
