<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\PasswordEncryptService;
use App\Services\PasswordService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request, PasswordService $passwordService): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $oldKey = Str::substr($request->input('current_password'), 0, 8);
        $newKey = Str::substr($request->input('password'), 0, 8);
        $passwordService->changeEncryptionKey($oldKey, $newKey);
        PasswordEncryptService::setSessionEncryptedPassword($request->input('password'));

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
