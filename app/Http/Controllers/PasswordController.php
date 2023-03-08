<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasswordRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\Password;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order');
        $search = $request->input('search');

        $passwords = Password::orderByDesc('views')
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

        return Inertia::render('Dashboard', compact('passwords'));
    }

    public function store(StorePasswordRequest $request)
    {
        $data = $request->validated();
        Auth::user()->passwords()->create($data);

        return redirect()->route('dashboard');
    }
}
