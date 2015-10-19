var directives = {};

directives.timer = function($interval, RunService, $filter){
	return{
		restrict: 'E',
		templateUrl: '/views/timer.html',
		link: function(scope, elm, attrs){
			var START = null;//set to now when pressed start
			var STOP = null;//et to now when pressed stop
			var LAPSTART = null;//set to now when pressed start first time and when press on new lap
			var TOTALTIME = 0;

			//scope variables for visible timer and button display
			scope.timerOn = false;
			scope.totalTime = 0;
			scope.totalLapTime = 0;
			scope.laps = [];
			count = 1;
			
			var timePromise; //used for keeping track of the timeout fn

			//----------------------------------------
			// called every millisecond to keep track of time ellapsed
			//----------------------------------------
			var incrementTimer = function(){
				var now = Date.now();
				if(!STOP){
					scope.totalTime = now - START;
		  		}else{
		  			scope.totalTime = (now-START) + TOTALTIME;
		  		}
		  		scope.totalLapTime = now - LAPSTART;
			}
 			
 			scope.startTimers = function(){
 				var d = Date.now();
 				START = d;
 				LAPSTART = d;
 				//start the interval function
 				timePromise = $interval(function(){
				incrementTimer();
				}, 1);
				scope.timerOn = true;
			}

			scope.stopTimers = function(){
				STOP = Date.now();
				//cancel the interval funtion
				$interval.cancel(timePromise);
				var interval = STOP - START;//last interval time
				TOTALTIME = TOTALTIME + interval;//count totaltime ellapsed
				saveLap(STOP);
				scope.timerOn = false;
				scope.totalTime = TOTALTIME;
			}

			scope.newLap = function(){
				saveLap(Date.now());
			}

			scope.reset = function(){
				START = null;
				LAPSTART = null;
				STOP = null;
				TOTALTIME = 0;

				scope.timerOn = false;
				scope.totalTime = 0;
				scope.totalLapTime = 0;
				scope.laps = [];
				scope.runIsFinished = false;
				count = 1;
				
				timePromise = null;
			}

			var saveLap = function(timeStamp){
 				var lap = timeStamp - LAPSTART;
 				scope.laps.push({time: lap, nr: count});
 				LAPSTART = timeStamp;
 				scope.totalLapTime = 0;
 				count ++;
			}

			// scope.newRun = function(){
			// 	//date and time will be the name of run
			// 	var d = new Date();
			// 	var dString = d.getDate() + d.getMonth
			// 	//prepare current run for save
			// 	if(scope.totalTime){
			// 		var run = {
			// 			name: $filter('date')(new Date(),'dd MMM yyyy, h:mm a'),
			// 			totalTime: angular.copy(scope.totalTime),
			// 			laps: scope.laps,
			// 		};

			// 		RunService.addRun(run);
			// 	}
			// 	reset();
			// }
		}	            
	}
}