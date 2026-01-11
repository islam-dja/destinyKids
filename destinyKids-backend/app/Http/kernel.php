protected $middlewareGroups = [
    'api' => [
        \App\Http\Middleware\ForceJsonResponse::class, // Add this line
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'api.rate_limit' => \App\Http\Middleware\ApiRateLimit::class,
    ],
];