<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function upload(string $fileField, string $directory): string
    {
        $path = request()->file($fileField)->store($directory, 's3');

        return Storage::disk('s3')->url($path);
    }

    public function delete(string $url): void
    {
        $path = parse_url($url, PHP_URL_PATH);
        $path = ltrim($path, '/');

        if (Storage::disk('s3')->exists($path)) {
            Storage::disk('s3')->delete($path);
        }
    }
}
