@extends('layouts.layout')

@section('content')
    <div id="root"></div>

    <script src="{{ asset('js/app.js') }}" supportedLocales={{json_encode($data)}} defer></script>
@endsection
