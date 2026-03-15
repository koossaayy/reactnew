<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
        public function handle(Request $request, Closure $next)
    {
        $locale = $this->resolveLocale($request);
        app()->setLocale($locale);
        session(['locale' => $locale]);

        return $next($request);
    }

    private function resolveLocale(Request $request): string
    {
        $supported = config('app.available_locales', ['en']);

        // 1. User preference from DB
        if ($request->user()?->locale && in_array($request->user()->locale, $supported)) {
            return $request->user()->locale;
        }

        // 2. Session / cookie (set by language picker)
        if ($sessionLocale = session('locale')) {
            if (in_array($sessionLocale, $supported)) {
                return $sessionLocale;
            }
        }

        // 3. Browser Accept-Language header
        $preferred = $request->getPreferredLanguage($supported);
        if ($preferred) {
            return $preferred;
        }

        // 4. App default
        return config('app.locale', 'en');
    }

}
