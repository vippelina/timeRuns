var directives = {};

directives.timer = function($interval, RunService, $filter){
	return{
		restrict: 'E',
		templateUrl: '/views/timer.html',
		link: function(scope, elm, attrs){
			var START = null;
			var LAPSTART = null;
			var STOP = null;
			var TOTALTIME = 0;

			scope.timerOn = false;
			scope.totalTime = 0;
			scope.totalLapTime = 0;
			scope.laps = [];
			scope.runIsFinished = false;
			var count = 0;
			
			var timePromise; //used for keeping track of the timeout fn

			var incrementTimer = function(){
				var now = Date.now();
 
				if(!STOP){
					scope.totalTime = now - START;
		  		}else{
		  			scope.totalTime = (now-START) + TOTALTIME;
		  		}
		  		scope.totalLapTime = now - LAPSTART;

		  		count++;
			}
		  		
			scope.startStopTimer = function(){
				if(scope.timerOn){
					stopTimers();
				}else{
					startTimers();
				}
			}

			scope.newLapOrReset = function(){
				if(scope.timerOn){
					saveLap(Date.now());
				}else{
					reset();
				}
			}

			scope.newRun = function(){
				//date and time will be the name of run
				var d = new Date();
				var dString = d.getDate() + d.getMonth
				//prepare current run for save
				if(scope.totalTime){
					var run = {
						name: $filter('date')(new Date(),'dd MMM yyyy, h:mm a'),
						totalTime: angular.copy(scope.totalTime),
						laps: scope.laps,
					};

					RunService.addRun(run);
				}
				reset();
			}

			var saveLap = function(timeStamp){
 				var lap = timeStamp - LAPSTART;
 				scope.laps.push({time: lap});
 				LAPSTART = timeStamp;
 				scope.totalLapTime = 0;


 
			
			}

			var reset = function(){
				START = null;
				LAPSTART = null;
				STOP = null;
				TOTALTIME = 0;

				scope.timerOn = false;
				scope.totalTime = 0;
				scope.totalLapTime = 0;
				scope.laps = [];
				scope.runIsFinished = false;
				count = 0;
				
				timePromise = null;
			}

			var startTimers = function(){
 				var d = Date.now();
 				START = d;
 				LAPSTART = d;
 				timePromise = $interval(function(){
				incrementTimer();
				}, 1);
				scope.timerOn = true;
			}

			var stopTimers = function(){
				STOP = Date.now();
				$interval.cancel(timePromise);
				var interval = STOP - START;
				TOTALTIME = TOTALTIME + interval;
				saveLap(STOP);
				scope.timerOn = false;
				scope.totalTime = TOTALTIME;
			}

	 

			//when calculating lap räknar vi totalen som tiden som blir när man tar nu minus starttiden. Men om man har stoppat så 
			//så bprde det bli den totala tiden 
		}	            
	}
}