<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <script type="text/javascript">
            var tokenLaravel = "{{ csrf_token() }}";
        </script>

        <!-- Fonts -->
        <!-- <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet"> -->
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
        <!--JQuery-->
        <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

        
        <!-- <script type="text/javascript" src="{{ asset('js/jquery-1.9.1.min.js') }}"></script> -->
        <script type="text/javascript" src="{{ asset('js/kendo/kendo.all.js') }}"></script>


        <!--JCrop (Jquery plugin for cropping images)-->
        <script type="text/javascript" src="{{ asset('js/file_upload/js/jquery.Jcrop.min.js') }}"></script>
        <link href="{{ asset('js/file_upload/css/jquery.Jcrop.min.css') }}" rel="stylesheet"></link>

        <!--Custom Input File-->
        <script type="text/javascript" src="{{ asset('js/file_upload/js/custominputfile.min.js') }}"></script>
        <link href="{{ asset('js/file_upload/css/custominputfile.min.css') }}" rel="stylesheet"></link>

        <!-- Dtatables -->
        <link href="{{ asset('css/datatables/dataTables.bootstrap4.css') }}" rel="stylesheet"></link>
        <script type="text/javascript" src="{{ asset('js/datatables/jquery.dataTables.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/datatables/dataTables.bootstrap4.js') }}"></script>

        
        <link href="{{ asset('css/fontawesome-free/all.css') }}" rel="stylesheet"></link>

        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8.7.0/dist/sweetalert2.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@8.7.0/dist/sweetalert2.min.css">

        <style>
            html, body {
                font-family: 'Poppins';
            }
            .btn-primary-app {
                background-color: #4650dd;border-color: #4650dd;color: white;
            }
            .btn-primary-app:focus,.btn-primary-app:hover{color:#fff;background-color:#3c44bc;border-color:#3840b1}
        
            .loading {
                position: absolute;
                top: 50%;
                left: 50%;
                position: fixed;
                z-index: 1000;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: rgba( 255, 255, 255, .8 )50% 50% no-repeat;
            }

            .loading-bar {
                display: inline-block;
                width: 4px;
                height: 18px;
                border-radius: 4px;
                animation: loading 1s ease-in-out infinite;
            }

            .loading-bar:nth-child(1) {
                background-color: #3498db;
                animation-delay: 0;
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 49%;
            }

            .loading-bar:nth-child(2) {
                background-color: #c0392b;
                animation-delay: 0.09s;
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 49.5%;
            }

            .loading-bar:nth-child(3) {
                background-color: #f1c40f;
                animation-delay: .18s;
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 50%;
            }

            .loading-bar:nth-child(4) {
                background-color: #27ae60;
                animation-delay: .27s;
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 50.5%;
            }

            @keyframes loading {
                0% {
                    transform: scale(1);
                }

                20% {
                    transform: scale(1, 2.2);
                }

                40% {
                    transform: scale(1);
                }
            }

            table.dataTable {
                border-collapse: collapse !important;
                border: 1px solid #e3e3e3;
            }

        </style>
    </head>
    <body>

        <header>
            <div class="navbar navbar-white bg-white shadow">
                <div class="container">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <strong>Reportes</strong>
                    </a>
                </div>
            </div>
        </header>

        <main>
            <section class="py-5 container-fluid">
                @yield('content')
            </section>
        </main>

        <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->

        
    <div id="loading" class="loading" style="display:none">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
    </div>
    </body>
</html>
