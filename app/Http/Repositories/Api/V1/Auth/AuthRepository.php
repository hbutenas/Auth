<?php

namespace App\Http\Repositories\Api\V1\Auth;

use App\Models\User;

class AuthRepository
{
  public function store(object $credentials)
  {
    return User::create([
      'email' => $credentials->email,
      'password' => $credentials->password
    ]);
  }
}
