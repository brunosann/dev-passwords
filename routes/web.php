<?php

use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [PasswordController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('passwords/{password}', [PasswordController::class, 'show'])->name('passwords.show');
    Route::post('passwords', [PasswordController::class, 'store'])->name('passwords.store');
    Route::put('passwords/{password}', [PasswordController::class, 'update'])->name('passwords.update');
    Route::delete('passwords/{password}', [PasswordController::class, 'destroy'])->name('passwords.destroy');
});

require __DIR__ . '/auth.php';
