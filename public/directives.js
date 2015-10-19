var directives = {};

directives.timer = function($interval, RunService, $filter){
	return{
		restrict: 'E',
		templateUrl: '/views/timer.html',
		link: function(scope, elm, attrs){
			var Timer = {
				startTime: 0,
				stoppedTime: null,
				now: null,
				reset: function(){
					this.startTime = 0;
					this.stoppedTime = null;
					now = null;
				}
			}

			var LapTimer = {
				startTime: 0,
				stoppedTime: null,
				now: null,
				newLap: function(){
					this.startTime = 0;
					this.stoppedTime = null;
					now = null;
				}
			}

			scope.timerOn = false;
			scope.totalTime = 0;
			scope.totalLapTime = 0;
			scope.lapTimerOn = false;
			scope.laps = [];
			scope.runIsFinished = false;
			
			var timePromise; //used for keeping track of the timeout fn

			var incrementTimers = function(){
				Timer.now = Date.now();
				//increment mainTimer
				if(!Timer.stoppedTime){
					console.log("no stopped time");
					scope.totalTime = Timer.now - Timer.startTime;
		  		}else{
		  			scope.totalTime = (Timer.now-Timer.startTime) + Timer.stoppedTime;
		  		}

		  		//increment lapTimer
		  		scope.totalLapTime = Timer.now - LapTimer.startTime;
			}

			scope.startStopTimer = function(){
				if(scope.timerOn){
					stopTimers();
				}else{
					startTimers();
				}
			}

			scope.lapOrReset = function(){
				if(scope.timerOn){
					calculateLap(Date.now());
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

			var calculateLap = function(timeStamp){
				var total = timeStamp - Timer.startTime;
				if(Timer.stoppedTime){
					total = scope.totalTime;
				}
				var totalLapsTime = 0;
				//loop through eventual previous laps time
				for (var i = 0; i < scope.laps.length; i++) {
					totalLapsTime += scope.laps[i].time;
				};

				var lap = total - totalLapsTime;
				//don't save an empty value if nothing has happened
				if(lap == 0){
					return;
				}
				scope.laps.push({time: lap});
			}

			var reset = function(){
				scope.totalTime = 0;
				scope.lapTime = 0;
				scope.laps = [];
				Timer.reset();
			}

			var startTimers = function(timeStamp){
				timePromise = $interval(function(){
				incrementTimers();
				}, 1);
				scope.timerOn = true;
			}

			var startLapTimer = function(timeStamp){
				LapTimer.startTime = Date.now();
			}

			var stopTimers = function(){
				$interval.cancel(timePromise);
				Timer.stoppedTime = angular.copy(scope.totalTime);
				scope.timerOn = false;
				scope.lapTimerOn = false;//do we need this?
			}

			//when calculating lap räknar vi totalen som tiden som blir när man tar nu minus starttiden. Men om man har stoppat så 
			//så bprde det bli den totala tiden 
		}	            
	}
}