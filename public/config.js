//***************************************************
// Register module
//***************************************************
var Timer = angular.module('Timer', ['externalLibs']);
var externalLibs = angular.module('externalLibs', ['ui.router']);
//***************************************************
// Config
//***************************************************
Timer.config(function($urlRouterProvider, $stateProvider, $httpProvider){
	//set routes
	$stateProvider
		.state('start', {
			url: '/',
			views: {
				'previousRuns': {
					templateUrl: '/views/prevRuns.html',
					controller: 'prevRunsController'
				},
				'newRun': {
					templateUrl: '/views/newRun.html',
					controller: 'newRunController'
				}
			}
		});
})
//***************************************************
// Run
//***************************************************
Timer.run(function(){
	console.log("running");
})

Timer.filter('formatTime', function() {
    //Returns duration from milliseconds in hh:mm:ss format.
      return function(millseconds) {
      	console.log("got millseconds", millseconds);
        var seconds = Math.floor(millseconds / 1000);
        console.log("seconds", seconds);
        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds/h);
        var minutes = Math.floor( (seconds % h)/m );
        var scnds = Math.floor( (seconds % m) );
        var timeString = '';
        if(scnds < 10) scnds = "0"+scnds;
        if(hours < 10) hours = "0"+hours;
        if(minutes < 10) minutes = "0"+minutes;
        timeString = hours +":"+ minutes +":"+scnds;
        return timeString;
    }
});
//********************************************************************
// BOOTSTRAP TO SERVICES, CONTROLLERS AND DIRECTIVES
//********************************************************************
	//connect services array to module
	Timer.service(services);

	//connect controller array to module
	Timer.controller(controllers);

	//connect service array to module
	Timer.directive(directives);