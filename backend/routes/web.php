<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SnippetController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::apiResource('snippets', SnippetController::class)->only(['index', 'store']);
});
