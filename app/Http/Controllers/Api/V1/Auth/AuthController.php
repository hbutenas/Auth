<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Services\Api\V1\Auth\AuthService;
use App\Http\Requests\Api\V1\Auth\LoginUserRequest;
use App\Http\Requests\Api\V1\Auth\RegisterUserRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterUserRequest $request): object
    {
        return $this->authService->register($request);
    }

    public function login(LoginUserRequest $request): object
    {
        return $this->authService->login($request);
    }

    public function logout(Request $request): object
    {
        return $this->authService->logout($request);
    }

    public function identify(): object
    {
        return $this->authService->identify();
    }
}
