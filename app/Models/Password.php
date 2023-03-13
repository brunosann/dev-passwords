<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Services\PasswordEncryptService;

class Password extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'password',
        'username',
        'custom_fields',
        'views',
    ];

    protected $casts = [
        'custom_fields' => 'array',
    ];

    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => (new PasswordEncryptService)->encrypt($value),
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
