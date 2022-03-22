@extends('layouts.layout')

@section('content')
    <div className='flex flex-col w-full'>
        <div className="flex flex-nowrap flex-row w-full mx-0">
            <main className="bg-gray-light col px-0">

            </main>
        </div>
    </div>

{{--    @if ($message = Session::get('success'))--}}
{{--        <div class="alert alert-success">--}}
{{--            <p>{{ $message }}</p>--}}
{{--        </div>--}}
{{--    @endif--}}

    <script>
        $(document).ready(function() {
            sendRequest();

            function sendRequest() {
                var url = "{{URL('userData')}}";
                $.ajax({
                    // url: "/api/auth/admin/geofences/dashboard-data",
                    url: "/api/auth/dashboard-data",
                    type: "POST",
                    data:{
                        _token:'{{ csrf_token() }}'
                    },
                    cache: false,
                    dataType: 'json',
                    success: function(dataResult){
                        console.log(dataResult);
                        var resultData = dataResult.data;
                        var bodyData = '';
                        var i=1;
                        $.each(resultData,function(index,row){
                            var editUrl = url+'/'+row.id+"/edit";
                            bodyData+="<tr>"
                            bodyData+="<td>"+ i++ +"</td><td>"+row.name+"</td><td>"+row.email+"</td><td>"+row.phone+"</td>"
                                +"<td>"+row.city+"</td><td><a class='btn btn-primary' href='"+editUrl+"'>Edit</a>"
                                +"<button class='btn btn-danger delete' value='"+row.id+"' style='margin-left:20px;'>Delete</button></td>";
                            bodyData+="</tr>";

                        })
                        $("#bodyData").append(bodyData);
                    },

                    complete: function() {
                        // Schedule the next request when the current one's complete
                        setInterval(sendRequest, 3000); // The interval set to 5 seconds
                    }
                });

            }
        });
    </script>
@endsection
