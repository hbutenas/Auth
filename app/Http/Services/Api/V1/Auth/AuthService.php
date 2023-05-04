<?php

namespace App\Http\Services\Api\V1\Auth;

use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Repositories\Api\V1\Auth\AuthRepository;

class AuthService
{

  use HttpResponses;

  protected $authRepository;

  public function __construct(AuthRepository $authRepository)
  {
    $this->authRepository = $authRepository;
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

    return $this->successfullRequest(Auth::user(), 'User successfully logged in', 200);
  }

  public function logout(object $request)
  {
    // Clear the user's session data and log them out
    Auth::logout();
    
    // Invalidate the session
    $request->session()->invalidate();

    return $this->successfullRequest('', 'User successfully logged out', 200);
  }
}
