var services = {};

//***************************************************
// Container for the run
//***************************************************
services.RunService = function($rootScope){
	console.log("in i LapService");
	 
	var runs = [];

	//----------------------------------------
	//Add run to list
	//----------------------------------------
	this.addRun = function(run){
		runs.push(run);
		$rootScope.$broadcast('previousRunsUpdated');
		console.log(runs);
	}

	this.getPreviousRuns = function(){
		return runs;
	}

	this.startRun = function(){

	}


}

