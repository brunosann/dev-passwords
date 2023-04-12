<?php

namespace App\Services;

use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class PasswordEncryptService
{
  public function encrypt(string $value, ?string $encryptionKey = null)
  {
    $key = $this->getEncryptionKey($encryptionKey);
    $newEncrypter = new Encrypter($key, config('app.cipher'));
    $encrypted = $newEncrypter->encrypt($value);

    return $encrypted;
  }

  public function decrypt(string $value, ?string $encryptionKey = null): string
  {
    $key = $this->getEncryptionKey($encryptionKey);
    $newEncrypter = new Encrypter($key, config('app.cipher'));
    $decrypted = $newEncrypter->decrypt($value);

    return $decrypted;
  }

  private function getEncryptionKey(?string $encryptionKey = null)
  {
    $encryptedPassword = session()->get('encryptedPassword');

    if (!$encryptedPassword) {
      Auth::guard('web')->logout();
      session()->invalidate();
      session()->regenerateToken();

      return redirect('/');
    }

    $decrypted = $encryptionKey ?? Crypt::decryptString($encryptedPassword);
    $key = env('KEY_ENCRYPTER') . $decrypted;

    return $key;
  }

  public static function setSessionEncryptedPassword(string $password)
  {
    $firstEightCharactersOfPassword = Str::substr($password, 0, 8);
    $encryptedPassword = Crypt::encryptString($firstEightCharactersOfPassword);
    session()->put('encryptedPassword', $encryptedPassword);
  }
}
