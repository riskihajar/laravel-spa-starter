<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="riskihajar">
    <meta property="og:title" content="Laravel SPA Starter Kit" />
    <meta property="og:url" content="{{ request()->fullUrl() }}" />
    <meta property="og:description" content="Vue.js + Laravel Based SPA Starter Kit" />
    <meta property="og:image" content="{{ asset('img/cover.png') }}" />
    <title>Laravel SPA Starter</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div id="app"></div>
    <script>
        window.apiURL = '{{ url('api') }}';
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
