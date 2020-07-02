// angular home kalendar controller
var module = angular.module("homeKalendar", [])


function homeKalendarController($scope, $http) {
    $scope.DataCount = 0;
    $scope.events = []; // test

    var _events;

    $http.get("/api/v1/events")
        .then(function (result) {
            console.log(result.data);

            angular.copy(result.data, $scope.events)

            _events = _.map(result.data, function (e) { // prilagoditi za fullcalendar js sintaksu
                return { // foreach
                    id: e.id,
                    title: e.name,
                    start: e.from,
                    end: e.until
                };
            });

            // ---------- FULLKALENDAR JQUERY ------------
            $(document).ready(function () {
                var _currentDate = new Date();

                $('#calendar').fullCalendar({
                    dayRightclick: function (date, jsEvent, view) {
                        alert('rightclicked on day ' + date.format());
                        // Prevent browser context menu:
                        return false;
                    },
                    eventClick: function (event, jsEvent, view) {
                        alert('ID eventa je ' + event.id + ', pocinje od: ' + event.start.format() +
                            ', završava u ' + event.end.format());
                        // Prevent browser context menu:
                        return false;
                    },
                    // TODO - dovrši eventDrop
                    //eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                    //    // underscoreJS
                    //    var dropaniEvent = _.find(schedulerEvents, function (sEvent) {
                    //        return sEvent.id == event.id
                    //    });

                    //    dropaniEvent.from = moment(event.start).format();

                    //    if (event.end == null) {
                    //        dropaniEvent.until = moment(event.start).format();
                    //    }
                    //    else if (event != null) {
                    //        dropaniEvent.until = moment(event.end).format();
                    //    }

                    //    eventsRepo.update(dropaniEvent).then(function () { // saljemo mu event na backend

                    //    });
                    //    return false;
                    //},
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay,agendaWeek,agendaDay,listWeek'
                    },

                    buttonText: {
                        basicWeek: 'basicWeek',
                        basicDay: 'Day',
                        agendaWeek: 'agendaWeek',
                        agendaDay: 'agendaDay',
                        listWeek: 'List'
                    },
                    defaultDate: _currentDate,
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: _events
                });

            });

        },
            function () {
                //error
                alert("Error u hvatanju podataka preko API");
            });
};