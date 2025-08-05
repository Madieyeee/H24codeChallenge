<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SnippetController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/snippets', [SnippetController::class, 'index']);
    Route::post('/snippets', [SnippetController::class, 'store']);
    Route::get('/snippets/{snippet}', [SnippetController::class, 'show']);
    Route::put('/snippets/{snippet}', [SnippetController::class, 'update']);
    Route::delete('/snippets/{snippet}', [SnippetController::class, 'destroy']);
});
