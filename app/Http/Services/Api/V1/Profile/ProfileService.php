<?php

namespace App\Http\Services\Api\V1\Profile;

use App\Http\Repositories\Api\V1\Profile\ProfileRepository;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

class ProfileService
{
  use HttpResponses;

  protected $profileRepository;

  public function __construct(ProfileRepository $profileRepository)
  {
    $this->profileRepository = $profileRepository;
  }

  public function update(object $request)
  {
    // Get user id
    $userId = Auth::user()->id;

    // Update user profile
    $updatedProfile = $this->profileRepository->update($userId, $request);

    // For some reasons couldn't update the profile
    if (!$updatedProfile) {
      return $this->failedRequest('', 'Something went wrong while updating profile', 400);
    }

    return $this->successfullRequest('', 'Profile successfully updated', 200);
  }
}
