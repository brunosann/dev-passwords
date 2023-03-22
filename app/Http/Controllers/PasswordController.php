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

    public function show($id, Request $request, PasswordService $passwordService)
    {
        $isEdit = $request->has('edit');
        $password = $passwordService->findOne($id, !$isEdit);

        return $password;
    }

    public function store(StorePasswordRequest $request, PasswordService $passwordService)
    {
        $data = $request->validated();
        $passwordService->new($data);

        return redirect()->route('dashboard');
    }

    public function update($id, StorePasswordRequest $request, PasswordService $passwordService)
    {
        $passwordService->update($id, $request->validated());

        return redirect()->route('dashboard');
    }
}
