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

			scope.timerOn = false;
			scope.totalTime = 0;
			scope.laps = [];
			
			var timePromise;
			var incrementTimer = function(){
				Timer.now = Date.now();
				if(!Timer.stoppedTime){
					scope.totalTime = Timer.now - Timer.startTime;
		  		}else{
		  			scope.totalTime = (Timer.now-Timer.startTime) + Timer.stoppedTime;
		  		}
			}

			scope.startTimer = function(){
				Timer.startTime = Date.now();
				timePromise = $interval(function(){
				incrementTimer();
				}, 1);
				scope.timerOn = true;
			}

			scope.stopTimer = function(){
				$interval.cancel(timePromise);
				Timer.stoppedTime = angular.copy(scope.totalTime);
				scope.timerOn = false;
			}

			scope.resetTimer = function(){
				reset();
			}

			scope.lapMark = function(){
				if(scope.timerOn){
					calculateLap(Date.now());
				}
			}

			scope.finishRun = function(){
				calculateLap(Timer.now);
				$interval.cancel(timePromise);
				stoppedTime = angular.copy(scope.totalTime);
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
		}	            
	}
}