<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileImageRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function updateProfileImage(UpdateProfileImageRequest $request)
    {
        try {
            $user = $request->user();
            Log::info('Authenticated user', [$user]); // Log authenticated user

            $fileName = $request->file('profile_image')->store('images_' . $user->id);
            User::where('id', $user->id)->update(['profile_image' => $fileName]);

            return response()->json(['image' => $fileName]);
        } catch (\Exception $err) {
            Log::error('Profile image error => ' . $err->getMessage());
            return response()->json(['message' => 'Something went wrong. Please try again later!'], 500);
        }
    }
}
