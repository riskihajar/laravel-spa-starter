<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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