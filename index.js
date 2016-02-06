//goal1: playback a rhythm.


// var userRhythm = new tappy.Rhythm();

// function tapThat () {userRhythm.tap(); }
//turn window into a specific div or class
// document.getElementById('drumCircle').addEventListener('click', console.log('tap'), false);

// if (userRhythm.length === 8) {
// 	userRhythm.done();
// 	userRhythm.playback();
// }

//all the pieces there!

var rhythmApp = angular.module("rhythmApp", []);
rhythmApp.controller("rhythmController", function($scope) {

	var userRhythm = new tappy.Rhythm();
 	

 	//testing rhythms.
 	var example1 = new tappy.Rhythm([1, 1, 1, 1, 2, 2, 2]);

	$scope.tapDrum = function() {
		if (userRhythm.length <=8) {
			userRhythm.tap();
			console.log('tap');
		} else {
			userRhythm.done();
			console.log("rhythm done.")
			// userRhythm.playback();	
		}
			
	}

	$scope.playRhythm = function() {
		userRhythm.done();
		userRhythm.playback(
			function(i) {console.log('Tap number' + i); },
			function() {console.log('Finished rhythm.')}
		);
	}

	$scope.compareRhythm = function() {
		console.log("comparing.");
		alert(tappy.compare(userRhythm, example1));
	}

	//later change 8 to a random length within defined parameters.
	// if (userRhythm.length===8) {
	// 	userRhythm.done();
	// 	console.log("rhythm done.")
	// 	userRhythm.playback();
	// }
	// 	}
});