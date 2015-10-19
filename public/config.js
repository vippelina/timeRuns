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
				'newRun': {
					templateUrl: '/views/newRun.html',
					controller: 'newRunController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');	
})
//***************************************************
// Run
//***************************************************
Timer.run(function(){
 console.log("angular is running");
 //angular is running
})

//***************************************************
// Filters
//***************************************************
//----------------------------------------
//Format milliseconds to hh:mm:ss:mss
//----------------------------------------
Timer.filter('formatMS', function() {
    //Returns duration from milliseconds in hh:mm:ss format.
      return function(input) {
	 	//1. räkna ut millisekunderna
	 	var ms = input % 1000; // här kan det aldrig bli decimaler
	 	var s = Math.floor(input/1000 % 60);
	 	var min = Math.floor((input/(1000*60))%60);
	 	var h = Math.floor(input/(1000*60*60) % 24);

	 	if(ms < 10) ms = "00"+ms;
	 	if(ms >= 10 && ms < 100) ms = "0"+ms;
	 	if(s < 10) s = "0"+s;
		if(min < 10) min = "0"+min;
		if(h < 10) h = "0"+h;
	 	var str = h + ":" + min + ":" + s + ":" + ms;

	 	return str;       
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