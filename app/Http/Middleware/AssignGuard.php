<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Traits\APIsTrait;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use JWTAuth;


class AssignGuard extends BaseMiddleware
{
    use APIsTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if($guard != null) {
            auth()->shouldUse($guard); //shoud you admin guard / table
//            $token = $request->header('auth-token');
//            $request->headers->set('auth-token', (string) $token, true);
//            $request->headers->set('Authorization', 'Bearer '.$token, true);

//            $admin = null;
//            try {
//                $admin = JWTAuth::parseToken()->authenticate();
//            } catch (\Exception $e) {
//                if ($e instanceof TokenInvalidException) {
//                    return $this->returnError('INVALID_TOKEN', 'E3001');
//                } elseif ($e instanceof TokenExpiredException) {
//                    return $this->returnError('EXPIRED_TOKEN', 'E3002');
//                } else {
//                    return $this->returnError('Unauthenticated', 'E3003');
//                }
//            } catch (\Throwable $e) {
//                if ($e instanceof TokenInvalidException) {
//                    return $this->returnError('INVALID_TOKEN', 'E3001');
//                } elseif ($e instanceof TokenExpiredException) {
//                    return $this->returnError('EXPIRED_TOKEN', 'E3002');
//                } else {
//                    return $this->returnError('Unauthenticated', 'E3003');
//                }
//            }
        }
//        if (!$admin) {
//            return $this->returnError( 'Unauthenticated', '402');
//        }
        return $next($request);
    }
}
