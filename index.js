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

rhythmApp.controller("rhythmController", function($scope, $sce) {

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

//almost...
//stil not functioning completely correctly.
// rhythmApp.filter('spaceText', function() {
// 	return function(input) {
// 		if(!input) return input;
// 	// try \s
// 		var output = input.replace(/ /g, '&nbsp;');

// 		return output;
// 	};

// });

//use wad.js for sounds on each tap, and a css animation wave effect for the drum animation.