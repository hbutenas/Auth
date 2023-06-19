<?php

namespace App\Http\Services\Api\V1\Auth;

use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Repositories\Api\V1\Auth\AuthRepository;
use App\Http\Repositories\Api\V1\Profile\ProfileRepository;

class AuthService
{

  use HttpResponses;

  protected $authRepository;
  protected $profileRepository;

  public function __construct(AuthRepository $authRepository, ProfileRepository $profileRepository)
  {
    $this->authRepository = $authRepository;
    $this->profileRepository = $profileRepository;
  }

  public function register(object $data): object
  {
    // Make user email as lower cased and hash the provided password
    $data->email = strtolower($data['email']);
    $data->password = Hash::make($data['password']);

    // Call the repository to create user
    $user = $this->authRepository->store($data);

    // Something went wrong while creating the user, throw error 
    if (!$user) {
      return $this->failedRequest('', 'Something went wrong while creating the new user', 400);
    }

    // Create relation between user and profile and create blank user profile
    $this->profileRepository->store($user->id);

    // Return successfully created user
    return $this->successfullRequest($user, 'User successfully created', 201);
  }

  public function login(object $request): object
  {
    // Validate user credentials
    if (!Auth::attempt($request->only(['email', 'password']))) {
      return $this->failedRequest('', 'Invalid email address or password', 400);
    }

    // Regenerate session
    $request->session()->regenerate();

    // Store the authenticated user's ID in the session.
    $request->session()->put('user', Auth::user()->id);

    return $this->successfullRequest(Auth::user()->load('profile'), 'User successfully logged in', 200);
  }

  public function logout(object $request): object
  {
    // Clear the user's session data and log them out
    Auth::logout();

    // Invalidate the session
    $request->session()->invalidate();

    return $this->successfullRequest('', 'User successfully logged out', 200);
  }

  public function identify(): object
  {
    return Auth::user()->load(['profile']);
  }
}
