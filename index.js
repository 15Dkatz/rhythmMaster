//goal1: playback a rhythm. [check];
//goal2: [check] generate a random ryhthm array of quarter, whole or eighth notes, and the user gets feeback on whether or not they click the rhythm correctly.
//have the user see a staff with notes and rhythms displayed.
//add time signatures.
//the user can hear the rhythm
//animate the tap

//incorporate two key tapping for two staves - F and J, for example, if the left hand has a different rhythm than the right hand.
//useful for piano rhythm practicing.


//all the pieces there!

var rhythmApp = angular.module("rhythmApp", []);
rhythmApp.controller("rhythmController", function($scope) {

 	var noteLengths = [1, 2, 3, 4];
 	var limit = 8; /* 8 beats for two measures */

 	var gameRhythm = new Array();

 	var toLim=0;
 	var i=0;

 	$scope.rhythm = "";

 	while (toLim<limit) {
 		var randNote = Math.floor(Math.random()*3+1);
 		if ((toLim+randNote)>8){
 			randNote=8-toLim;
 		}
 		toLim+=randNote;
 		gameRhythm[i]=randNote;
 		i++;
 		$scope.rhythm += randNote + ' ';
 	}


 	var lastNote = gameRhythm.pop();

 	//add rests... after

 	var gameTappy = new tappy.Rhythm(gameRhythm);

 	console.log(gameTappy);
 	console.log(gameRhythm, lastNote);

 	var userRhythm = new tappy.Rhythm();

 	$scope.accuracy = "...";

	$scope.tapDrum = function() {
		if (userRhythm.length < gameRhythm.length) {
			userRhythm.tap();
			console.log('tap');
		} else {
			userRhythm.tap();
			userRhythm.done();
			console.log("rhythm done.")
			console.log("comparing ", tappy.compare(userRhythm, gameTappy));
			$scope.accuracy = tappy.compare(userRhythm, gameTappy).toFixed(2)*100;
		}

		// if (userRhythm.length === gameRhythm.length) {
		// 	console.log("comparing ", tappy.compare(userRhythm, gameTappy));
		// }

			
	}

	$scope.playRhythm = function() {
		userRhythm.done();
		userRhythm.playback(
			function(i) {console.log('Tap number ' + i); },
			function() {console.log('Finished rhythm.')}
		);
	}

	// $scope.compareRhythm = function() {
	// 	userRhythm.done();
	// 	console.log("comparing ", tappy.compare(userRhythm, gameTappy));
	// 	// userRhythm = new tappy.Rhythm();
	// }


});