<?php

namespace App\Http\Controllers\Api\V1\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Profile\UpdateProfileRequest;
use App\Http\Services\Api\V1\Profile\ProfileService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function update(UpdateProfileRequest $request)
    {
        return $this->profileService->update($request);
    }
}
