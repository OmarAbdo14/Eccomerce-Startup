@extends('layouts.layout')

@section('content')

<div class="card card-nav-tabs">
    <h1 class="card-header card-header-info">{{$section_name}}</h1>

    <div class="card-body py-5">
        {{--    {{dd([$sectionInputTypes, $data])}}--}}
    <div class="row justify-content-center w-100">
        <form action="{{route('cms.sectionUpdate', ['id'=>$id])}}" method="post" enctype="multipart/form-data" class="col-6">
            @csrf
            @foreach($sectionInputTypes as $type => $inputs)
{{--                {{dd($inputs)}}--}}
                <div class="type mb-5">
                    <label class="text-dark font-weight-bolder text-capitalize">{{$type}} :</label><br>
                    @foreach($inputs as $input => $values)
{{--                        {{dd($input)}}--}}
                        @if($type === 'file')
                            <label class="font-weight-bold text-capitalize">{{$input}} :</label>
                            <img src="{{$data[$input]}}" />
                        @elseif($type === 'links')
                            <div class="flex flex-row">
                                @foreach($values as $subInput => $subValidations)
                                    <input class="form-control mb-2" type="{{$subInput}}" name="{{$input}}" value="{{$data[$input][$key]}}" placeholder="{{$key}}" class="form-control"/>
                                @endforeach
                            </div>
                        @elseif($type === 'inputs')
                            @foreach($values as $key => $subValidations)
                                <input class="form-control mb-2" type="text" name="{{$input}}" value="{{$data[$input][$key]}}" placeholder="{{$key}}" class="form-control"/>
                            @endforeach
                        @endif
                        <input class="form-control mb-2" type="{{$type}}" name="{{$input}}" value="{{$data[$input]}}" placeholder="{{$input}}" class="form-control"/>
                    @endforeach
                </div>
            @endforeach
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

    </div>
</div>


@endsection
