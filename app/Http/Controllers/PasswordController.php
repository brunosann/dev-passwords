<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasswordRequest;
use App\Services\PasswordService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function index(Request $request, PasswordService $passwordService)
    {
        $order = $request->input('order');
        $search = $request->input('search');

        $passwords = $passwordService->list(order: $order, search: $search);

        return Inertia::render('Dashboard', compact('passwords'));
    }

    public function show($id, PasswordService $passwordService)
    {
        $password = $passwordService->findOne($id);

        return $password;
    }

    public function store(StorePasswordRequest $request, PasswordService $passwordService)
    {
        $data = $request->validated();
        $passwordService->new($data);

        return redirect()->route('dashboard');
    }
}
