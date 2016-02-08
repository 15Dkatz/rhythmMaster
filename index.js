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
	 				$scope.$apply($scope.setAccuracy(globalAccuracy.toFixed(2)*100));
	 			}
	 		}
	 	})
	 	//end of class
 	}

 	//Transform the Rythm into musiSync readable code.
 	//perhaps use to create rests!
 	var numNotePairs = {
 		1: "q",
 		2: "h",
 		3: "j",
 		4: "w"
 	}


 	var keyF = new KeyRhythm("F");
 	$scope.keyFDisplay = keyF.rhythmDisplay.substr(9);


 	//change each num in keyFDisplay to a char in numNotePairs.!!
 	var musiSyncNotesF = keyF.rhythmDisplay.substr(9).split(" ");
 	// musiSyncArrayF = [];
 	// for (var changeF=0; changeF<musiSyncNotesF.length; changeF++) {
 	// 	musiSyncNotesF.push(numNotePairs[musiSyncNotesF[changeF]]);
 	// }
 	// for (var concatF=0; concatF<musiSyncNotesF.length; concatF++) {
 	// 	$scope.keyFDisplay += musiSyncNotesF[concatF] + " ";
 	// }
 	// // console.log(keyFDisplay);

 	var keyJ = new KeyRhythm("J");
 	$scope.keyJDisplay = keyJ.rhythmDisplay.substr(9);

});