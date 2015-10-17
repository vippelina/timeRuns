
var controllers = {};

controllers.prevRunsController = function($scope, $rootScope, RunService){
	console.log("allRunsController");
	$rootScope.$on('previousRunsUpdated', function(){
		$scope.prevRuns = RunService.getPreviousRuns();
	})
}

controllers.newRunController = function($scope, $rootScope, RunService){
	console.log("newRunController");
	var d = Date.now();
	$scope.d = Date.now();
}