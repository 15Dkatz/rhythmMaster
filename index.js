//goal1: playback a rhythm. [check];
//goal2: [check] generate a random ryhthm array of quarter, whole or eighth notes, and the user gets feeback on whether or not they click the rhythm correctly.
//add time signatures.


$(document).ready(function() {
	$(document).keydown(function(e) {
		var keyCode = e.keyCode || e.which,
		drumKeys = {f: 70, j: 74};
		switch(keyCode) {
			case drumKeys.f:
				$('#drumF').animate({ "font-size": "5rem" }, 80, 
									function() { $('#drumF').removeAttr('style'); });
			break;
			case drumKeys.j:
				$('#drumJ').animate({ "font-size": "5rem"}, 80, 
										function() { $('#drumJ').removeAttr('style'); });
			break;
		}
	})

	$(document).click(function() {
		$("#page2").addClass("animated fadeIn show");
		$("#page1").addClass("animated fadeOut");
	});
})


var rhythmApp = angular.module("rhythmApp", ['ngAnimate','ngAudio']);

rhythmApp.run(function($document, $rootScope){
	$document.bind('keydown', function(e) {
		$rootScope.$broadcast('keydown', e);
	});
});

rhythmApp.controller("rhythmController", function($scope, ngAudio, $animate) {

 	var noteLengths = [1, 2, 3, 4];
 	var limit = 8; /* 8 beats for two measures */


 	var keycodes = {
 		'F': 70,
 		'J': 74
 	}
 	//KeyRhythm Class that takes a key, and uses that key to bind to the tapDrum method

 	var globalAccuracy=0;
 	$scope.globalAccuracy=0;
	$scope.accuracyCount=0;


	$scope.arrayAverage = function(array) {
		var total=0;
		for (var i=0; i<array.length; i++) {
			total += array[i];
		}
		total = total/array.length;
		return total.toFixed(2)*100;
	};


 	var numNotePairs = {
 		1: "q",
 		2: "h",
 		3: "j",
 		4: "w",
 		//eigth notes
 		5: "e"
 	}

 	var next = false;

 	$scope.drumSound = ngAudio.load("sounds/SD0000.mp3");
	$scope.drumSound.volume = "1.0";
	var accuracies = [];


	//add a level setter on click.

	//add a level paramater, function(key, level)
	//if level == 1, 4/4 time signature, 2 measures, q, h, w, notes.
	//if level == 2, 4/4 time signature, 3 measures, w/ 8th notes too.
	//if level == 3, 6/8 time signature...

	//explain levels!

	//find the bug

	$scope.globalLevel = 1;

	$scope.$on('keydown', function(event, e) {
		//enter keycode
		if (e.which === 13) {
			if ($scope.globalLevel<3) {
				$scope.globalLevel+=1;
			} else {
				$scope.globalLevel=1;
			}
		}
	})


 	var KeyRhythm = function (key, level) {
 		globalAccuracy=0;
 		$scope.accuracyCount=0;
 		next=false;
 		var limit = 8;
 		if (level>1) {
 			limit=12;
 		}
 		var toLim = 0;
 		var rhythmDisplay;
 		var gameRhythm = new Array();

 		var i=0;

 		//changing which notes are available to access in numNotePairs
 		var randNoteLim = 4;
 		if (level>2) {
 			randNoteLim = 5;
 		}

 		while (toLim<limit) {
	 		var randNote = Math.floor(Math.random()*randNoteLim+1);
	 		if (randNote==5) {
	 			randNote=0.5;
	 		}
	 		if ((toLim+randNote)>limit){
	 			randNote=limit-toLim;
	 		}
	 		toLim+=randNote;
	 		gameRhythm[i]=randNote;
	 		i++;
	 		rhythmDisplay += randNote + ' ';
	 	}	

	 	var lastNote = gameRhythm.pop();

	 	this.rhythmDisplay = rhythmDisplay;
	 	this.gameRhythm = gameRhythm;

	 	var gameTappy = new tappy.Rhythm(gameRhythm);
	 	var userTappy = new tappy.Rhythm();


	 	//clear accuracy!! clear the tappy rhythm

	 	$scope.$on('keydown', function(event, e) {
	 		if (e.which === keycodes[key]) {
	 			//debigging
	 			console.log(key, "tapped");
	 			console.log(level, "level");
	 			if (userTappy.length < gameRhythm.length) {
	 				userTappy.tap();
	 				console.log($scope.accuracyCount, 'ac');
	 				if (accuracies.length==2) {
	 					accuracies = accuracies.splice(0,0);
	 				}
	 			} else {
	 				userTappy.tap();
	 				// userTappy.done();
	 				console.log("Your accuracy in pressing the rhythm for ", key, ':', tappy.compare(userTappy, gameTappy));
		 				
	 				if (tappy.compare(userTappy, gameTappy)!=false) {
	 					accuracies.push(tappy.compare(userTappy, gameTappy));
	 					console.log(accuracies);
	 					if (accuracies.length===2) {
		 					$scope.$apply($scope.globalAccuracy = $scope.arrayAverage(accuracies));
		 					$(document).ready(function() {
		 						$('.rhythmHead').removeClass("fadeOut")
		 						$('.rhythmHead').addClass("animated fadeIn show")
		 					})
						}
	 				}
	 				
	 				next=true;
	 			}
	 			$scope.drumSound.play();
	 		}
	 	})

	 	//change to music notation
	 	var musiSyncNotes = rhythmDisplay.substr(9).split(" ");
	 	var musiSyncNotesString = "";

	 	for (var f=0; f<musiSyncNotes.length-1; f++){
	 		if ((musiSyncNotes[f])==0.5) {
	 			musiSyncNotes[f]=5;
	 		}
	 		musiSyncNotes[f] = numNotePairs[musiSyncNotes[f]];
	 		musiSyncNotesString += musiSyncNotes[f];
	 		if (musiSyncNotes[f]==="q"){
	 			musiSyncNotesString += "\u00A0";
	 		}
	 		if (musiSyncNotes[f]==="h") {
	 			musiSyncNotesString += "\u00A0\u00A0\u00A0\u00A0";
	 		}
	 		if (musiSyncNotes[f]==="j") {
	 			musiSyncNotesString += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
	 		}
	 		if (musiSyncNotes[f]==="w") {
	 			musiSyncNotesString += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";	
	 		}
	 	}

	 	console.log(musiSyncNotesString);
	 	this.musiString = musiSyncNotesString.replace("undefined", "");
 	}

 	//perhaps use to create rests!
 	var keyF = new KeyRhythm("F", $scope.globalLevel);
 	$scope.keyFDisplay = keyF.musiString;

 	var keyJ = new KeyRhythm("J", $scope.globalLevel);
 	$scope.keyJDisplay = keyJ.musiString;

 	console.log(keyF.musiString, "FmusiString", keyJ.musiString, "JmusiString");


	$(document).ready(function() {	
		$(document).click(function() {
			if (next===true) {
				$('.rhythmHead').removeClass("fadeIn");
				$('.rhythmHead').addClass("animated fadeOut");
				console.log("new", next);
				keyF = new KeyRhythm("F", $scope.globalLevel);
				$scope.keyFDisplay = keyF.musiString;

				keyJ = new KeyRhythm("J", $scope.globalLevel);
				$scope.keyJDisplay = keyJ.musiString;
			} else {
				console.log(next, "false");
			}

		})
 	})
});

//use wad.js for sounds on each tap, and a css animation wave effect for the drum animation.