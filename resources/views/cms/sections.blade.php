@extends('layouts.layout')

@section('content')
{{--    {{dd($sections)}}--}}
@if(count($sections)>=1)
    <table class="table container">
        <thead class="text-center">
            <th class="text-dark" colspan="2">Section Name</th>
        </thead>
        <tbody>
            @foreach($sections as $section)
                <tr>
                    <td >{{$section->section_name}}</td>
                    <td class="text-right"><a class="btn btn-primary" href="{{route('cms.sectionForm', ['id'=>$section->id])}}">Update</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>
@else
    <div style="height: 100vh;" class="d-flex justify-content-center align-items-center">
        <h1>There is not any section</h1>
    </div>
@endif

@endsection
