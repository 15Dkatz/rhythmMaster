//goal1: playback a rhythm. [check];
//goal2: [check] generate a random ryhthm array of quarter, whole or eighth notes, and the user gets feeback on whether or not they click the rhythm correctly.
//add time signatures.
//the user can hear the rhythm!!
//animate the tap!!

//add instructions animation with clickable sound, and also add css animations

var rhythmApp = angular.module("rhythmApp", ['ngAudio']);

rhythmApp.run(function($document, $rootScope){
	$document.bind('keydown', function(e) {
		$rootScope.$broadcast('keydown', e);
	});
});

rhythmApp.controller("rhythmController", function($scope, ngAudio) {

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

 	var numNotePairs = {
 		1: "q",
 		2: "h",
 		3: "j",
 		4: "w"
 	}


 	var KeyRhythm = function (key) {
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

	 	console.log(rhythmDisplay, "rhythm for", key);


	 	var gameTappy = new tappy.Rhythm(gameRhythm);
	 	var userTappy = new tappy.Rhythm();

	 	// var tapSound = new Wad({source: 'triangle'})
	 	$scope.drumSound = ngAudio.load("sounds/SD0000.mp3");
	 	$scope.drumSound.volume = "1.0";

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
	 				$scope.$apply($scope.setAccuracy(globalAccuracy.toFixed(2)*100));
	 			}

	 			// tapSound.play({
	 			// 	volume: 0.8,
	 			// 	wait: 0,
	 			// 	pitch: 'C2',
	 			// 	env: {
	 			// 		attack: 0.1,
	 			// 		decay: 0.05,
	 			// 		sustain: 0.4,
	 			// 		hold: 0.05	
	 			// 	}
	 			// })
	 			$scope.drumSound.play();
	 		}
	 	})

	 	//change to music notation
	 	var musiSyncNotes = rhythmDisplay.substr(9).split(" ");
	 	var musiSyncNotesString = "";

	 	for (var f=0; f<musiSyncNotes.length-1; f++){
	 		musiSyncNotes[f] = numNotePairs[musiSyncNotes[f]];
	 		musiSyncNotesString += musiSyncNotes[f];
	 		//Use multiplication algorithm for spacing? .. <-

	 		//fix spacing....
	 		if (musiSyncNotes[f]==="h") {
	 			musiSyncNotesString += "\u00A0\u00A0";
	 		}
	 		if (musiSyncNotes[f]==="j") {
	 			musiSyncNotesString += "\u00A0\u00A0\u00A0\u00A0";
	 		}
	 		if (musiSyncNotes[f]==="w") {
	 			musiSyncNotesString += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
	 		}
	 	}

	 	this.musiString = musiSyncNotesString;

	 	//end of class
 	}

 	//Transform the Rythm into musiSync readable code.
 	//perhaps use to create rests!

 	var keyF = new KeyRhythm("F");
 	$scope.keyFDisplay = keyF.musiString;



 	var keyJ = new KeyRhythm("J");
 	$scope.keyJDisplay = keyJ.musiString;

 	console.log(keyF.musiString, "FmusiString", keyJ.musiString, "JmusiString");

});

//use wad.js for sounds on each tap, and a css animation wave effect for the drum animation.