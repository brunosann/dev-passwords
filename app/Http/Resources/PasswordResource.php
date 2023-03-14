<?php

namespace App\Http\Resources;

use App\Services\PasswordEncryptService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PasswordResource extends JsonResource
{
    public static $wrap = '';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $passwordEncryptService = new PasswordEncryptService;
        $decryptedPassword = $passwordEncryptService->decrypt($this->password);

        return [
            'name' => $this->name,
            'password' => $decryptedPassword,
            'description' => $this->description,
            'username' => $this->username,
            'custom_fields' => $this->custom_fields,
        ];
    }
}
