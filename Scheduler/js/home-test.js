// angular home test controller
var module = angular.module("homeTest", [])



function homeTestController($scope, $http) {
    $scope.data = [];
    $scope.placeholder = [];

    $(function () {
        $('#datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
    });

    $(function () {
        $('#datetimepicker2').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
    });


    $http.get("/api/v1/events")
        .then(function (result) {

            angular.copy(result.data, $scope.data)
            angular.copy(result.data, $scope.placeholder)

            $scope.data = _.map(result.data, function (e) { // prilagoditi za fullcalendar js sintaksu
                return { // foreach
                    id: e.id,
                    name: e.name,
                    from: moment(e.from).format('HH:mm || DD.MM.YYYY'),
                    until: moment(e.until).format('HH:mm || DD.MM.YYYY'),
                    description: e.description
                };
            });

            // $scope.myFunc = function () {
            //    // TESTIRANJE 

            //    // $('#datetimepicker1').data('DateTimePicker').date([]);
            // var selectedDate = $('#datetimepicker1').data('DateTimePicker').date();
            //    // selectedDate.toJSON();

            //    //moment(selectedDate).format('MM/dd/YYYY');



            //   console.log("test", $scope.newEvent[0].from);
            //   $scope.test = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
            //    console.log($scope.test);
            //$scope.newEvent = [{
            //    from: '',
            //    until: '',
            //    description:''
            //}];
            // $scope.newEvent[0].from = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
            // console.log($scope.newEvent[0].from);

            // };

        },
            function () {
                //error
                alert("Error u hvatanju podataka preko API");
            });

    $scope.podaci = {};
    $scope.save = function () {

        // podaci iz viewa u model
        var selectedDate1 = $('#datetimepicker1').data('DateTimePicker').date();
        var selectedDate2 = $('#datetimepicker2').data('DateTimePicker').date();

        $scope.newEvent = {
            name: $scope.podaci.name,
            from: moment(selectedDate1).format('YYYY-MM-DDTHH:mm:ss'),
            until: moment(selectedDate2).format('YYYY-MM-DDTHH:mm:ss'),
            description: $scope.podaci.description
        };

        $http.post("/api/v1/events", $scope.newEvent) // second parameter is the data that represents the Event being sent(posted)
            .then(function (result) {
                console.log("test 2", $scope.newEvent)
                //successful
                alert("uspjesno postan!");
            },
                function () {
                    //error
                    alert("Ne radi post!");
                });
    }
}