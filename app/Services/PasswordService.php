<?php

namespace App\Services;

use App\Http\Resources\PasswordResource;
use App\Models\Password;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class PasswordService
{
  public function list(?string $order, ?string $search): LengthAwarePaginator
  {
    $passwords = Auth::user()->passwords()
      ->select('id', 'name', 'username', 'description')
      ->when($search, function (Builder $query, string $search) {
        $query->where(function (Builder $query) use ($search) {
          $query->where('name', 'like', "%$search%")
            ->orWhere('description', 'like', "%$search%")
            ->orWhere('username', 'like', "%$search%");
        });
      })
      ->orderByDesc('views')
      ->when($order && $order === 'recent', function (Builder $query) {
        $query->reorder()->orderByDesc('created_at');
      })
      ->paginate()
      ->appends(request()->query());

    return $passwords;
  }

  public function new(array $data)
  {
    Auth::user()->passwords()->create($data);
  }

  public function findOne(string $id, bool $isIncrement)
  {
    $password = Auth::user()->passwords()->findOrFail($id);
    if ($isIncrement) $password->increment('views');

    return new PasswordResource($password);
  }

  public function update(string $id, array $data)
  {
    $password = Auth::user()->passwords()
      ->findOrFail($id)
      ->update($data);

    return $password;
  }

  function changeEncryptionKey(string $oldKey, string $newKey)
  {
    $passwords = Auth::user()->passwords()
      ->select('id', 'password')
      ->get()
      ->toArray();

    $passwordEncryptService = new PasswordEncryptService;

    collect($passwords)->each(function ($password) use ($passwordEncryptService, $oldKey, $newKey) {
      $oldPassword = $passwordEncryptService->decrypt($password['password'], $oldKey);
      $newPassword = $passwordEncryptService->encrypt($oldPassword, $newKey);

      Password::where('id', $password['id'])->update(['password' => $newPassword]);
    });
  }
}
