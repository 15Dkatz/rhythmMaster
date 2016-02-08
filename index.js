//goal1: playback a rhythm. [check];
//goal2: [check] generate a random ryhthm array of quarter, whole or eighth notes, and the user gets feeback on whether or not they click the rhythm correctly.
//have the user see a staff with notes and rhythms displayed.
//add time signatures.
//the user can hear the rhythm
//animate the tap

//incorporate two key tapping for two staves - F and J, for example, if the left hand has a different rhythm than the right hand.
//useful for piano rhythm practicing.
//all the pieces there!


//create a tapDrum() class, and pass in an 'f' arugment and a 'g' argument.


//figure out how to set a global accuracy!

//why doesnt the instance of globalAccuracy change the global scope?


var rhythmApp = angular.module("rhythmApp", []);

rhythmApp.run(function($document, $rootScope){
	$document.bind('keydown', function(e) {
		$rootScope.$broadcast('keydown', e);
	});
});

rhythmApp.controller("rhythmController", function($scope) {

 	var noteLengths = [1, 2, 3, 4];
 	var limit = 8; /* 8 beats for two measures */


 	var keycodes = {
 		'F': 70,
 		'J': 74
 	}
 	//KeyRhythm Class that takes a key, and uses that key to bind to the tapDrum method

 	var globalAccuracy=0;
 	$scope.globalAccuracy=0;
 	var accuracyCount=0;

 	$scope.setAccuracy = function(newAccuracy) {
 		$scope.globalAccuracy=newAccuracy;
 	}

 	// $scope.changeVar="..."

 	var KeyRhythm = function (key) {
 		// this.key = key;
 		var limit = 8;
 		var toLim = 0;
 		var rhythmDisplay;
 		var gameRhythm = new Array();

 		var i=0;

 		while (toLim<limit) {
	 		var randNote = Math.floor(Math.random()*4+1);
	 		if ((toLim+randNote)>8){
	 			randNote=8-toLim;
	 		}
	 		toLim+=randNote;
	 		gameRhythm[i]=randNote;
	 		i++;
	 		rhythmDisplay += randNote + ' ';
	 	}	

	 	var lastNote = gameRhythm.pop();

	 	this.rhythmDisplay = rhythmDisplay;
	 	this.gameRhythm = gameRhythm;
	 	// this.lastNote = lastNote;

	 	console.log(rhythmDisplay, "rhythm for", key);


	 	var gameTappy = new tappy.Rhythm(gameRhythm);
	 	var userTappy = new tappy.Rhythm();


	 	$scope.$on('keydown', function(event, e) {
	 		if (e.which === keycodes[key]) {
	 			console.log(key, "tapped");

	 			if (userTappy.length < gameRhythm.length) {
	 				userTappy.tap();
	 			} else {
	 				userTappy.tap();
	 				userTappy.done();
	 				console.log("Your accuracy in pressing the rhythm for ", key, ':', tappy.compare(userTappy, gameTappy));
	 				accuracyCount++;
	 				globalAccuracy=(globalAccuracy+tappy.compare(userTappy, gameTappy))/accuracyCount;
	 				$scope.$apply($scope.setAccuracy(globalAccuracy.toFixed(2)));
	 			}
	 		}
	 	})

 	}

 	var keyF = new KeyRhythm("F");
 	var keyJ = new KeyRhythm("J");

 	// $scope.globalAccuracy=keyF.accuracy;

 	// $scope.setAccuracy(45);

 	// if (keyF.accuracy!=undefined) {
 	// 	console.log(keyF.accuracy);
 	// }

 	// var gameTappyF = new tappy.Rhythm(keyF.gameRhythm);
 	// var gameTappyJ = new tappy.Rhythm(keyJ.gameRhythm);

 	// // $scope.tapDrumF = function($event) {
 	// // 	if ($event.ctrlKey) {
 	// // 		console.log("f pressed");
 	// // 	}
 	// // }

 	// var userRhythmF = new tappy.Rhythm();

 	// $scope.$on('keydown', function(event, e) {
 	// 	if (e.which === 70) {
 	// 		console.log("f tapped.");

 	// 		if (userRhythmF.length < keyF.gameRhythm.length) {
 	// 			userRhythmF.tap();
 	// 			console.log("F tap");
 	// 		} else {
 	// 			userRhythmF.tap();
 	// 			userRhythmF.done();
 	// 			console.log("comparing the F accuracy. accuracy: ", tappy.compare(userRhythmF, gameTappyF));
 	// 		}
 	// 	}
 	// })




 	// $scope.accuracy = "...";


 	// console.log(keyF.accuracy)

 	// if (keyF.accuracy!=undefined) {
 	// console.log(keyF.accuracy);
 	// }

 	// $scope.accuracy = (keyF.accuracy+keyJ.accuracy)/2;


 	// var gameRhythmF = new Array();
 	// var gameRhythmJ = new Array();




 	// var toLimF=0;
 	// var toLimJ=0;
 	// var i=0;

 	// $scope.rhythmF = "";
 	// $scope.ryhthmJ = "";

 	// while (toLimF<limit) {
 	// 	var randNoteF = Math.floor(Math.random()*4+1);
 	// 	if ((toLimF+randNoteF)>8){
 	// 		randNoteF=8-toLimF;
 	// 	}
 	// 	toLimF+=randNoteF;
 	// 	gameRhythmF[i]=randNoteF;
 	// 	i++;
 	// 	$scope.rhythm += randNote + ' ';
 	// }

 	// while (toLim<limit) {
 	// 	var randNoteF = Math.floor(Math.random()*4+1);
 	// 	if ((toLim+randNote)>8){
 	// 		randNote=8-toLim;
 	// 	}
 	// 	toLim+=randNote;
 	// 	gameRhythm[i]=randNote;
 	// 	i++;
 	// 	$scope.rhythm += randNote + ' ';
 	// }


 	// var lastNoteF = gameRhythmF.pop();

 	//add rests... after

 // 	var gameTappy = new tappy.Rhythm(gameRhythm);

 // 	console.log(gameTappy);
 // 	console.log(gameRhythm, lastNote);

 // 	var userRhythm = new tappy.Rhythm();

 // // 	$scope.accuracy = "...";

	// $scope.tapDrum = function() {
	// 	if (userRhythm.length < gameRhythm.length) {
	// 		userRhythm.tap();
	// 		console.log('tap');
	// 	} else {
	// 		userRhythm.tap();
	// 		userRhythm.done();
	// 		console.log("rhythm done.")
	// 		console.log("comparing ", tappy.compare(userRhythm, gameTappy));
	// 		$scope.accuracy = tappy.compare(userRhythm, gameTappy).toFixed(2)*100;
	// 	}	
	// }

	// $scope.playRhythm = function() {
	// 	userRhythm.done();
	// 	userRhythm.playback(
	// 		function(i) {console.log('Tap number ' + i); },
	// 		function() {console.log('Finished rhythm.')}
	// 	);
	// }

	// $scope.compareRhythm = function() {
	// 	userRhythm.done();
	// 	console.log("comparing ", tappy.compare(userRhythm, gameTappy));
	// 	// userRhythm = new tappy.Rhythm();
	// }


});