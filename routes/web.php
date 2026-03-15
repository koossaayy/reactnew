<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::resource('articles', ArticleController::class);
});
Route::post('/locale', function (Request $request) {
    $locale = $request->validate(['locale' => 'required|string|in:' . implode(',', config('app.available_locales', ['en']))])['locale'];

    session(['locale' => $locale]);

    // Optionally persist to DB:
    // $request->user()?->update(['locale' => $locale]);

    return back();
})->name('locale.update');

require __DIR__ . '/settings.php';
