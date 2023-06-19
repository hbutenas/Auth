<?php

namespace App\Http\Repositories\Api\V1\Profile;

use App\Models\Profile;

class ProfileRepository
{

  public function store(int $userId)
  {
    return Profile::create([
      'user_id' => $userId,
      'first_name' => null,
      'last_name' => null,
      'age' => null
    ]);
  }

  public function update(int $userId, object $request)
  {
    return Profile::where('user_id', $userId)->update([
      'first_name' => $request->first_name ? ucfirst($request->first_name) : null,
      'last_name' => $request->last_name ? ucfirst($request->last_name) : null,
      'age' => $request->age ? $request->age : null
    ]);
  }
}
