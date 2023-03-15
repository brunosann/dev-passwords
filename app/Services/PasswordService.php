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
      ->orderByDesc('views')
      ->when($order && $order === 'recent', function (Builder $query) {
        $query->reorder()->orderByDesc('created_at');
      })
      ->when($search, function (Builder $query, string $search) {
        $query->where('name', 'like', "%$search%")
          ->orWhere('description', 'like', "%$search%")
          ->orWhere('username', 'like', "%$search%");
      })
      ->paginate()
      ->appends(request()->query());

    return $passwords;
  }

  public function new(array $data)
  {
    Auth::user()->passwords()->create($data);
  }

  public function findOne(string $id)
  {
    $password = Auth::user()->passwords()->findOrFail($id);
    $password->increment('views');

    return new PasswordResource($password);
  }
}
