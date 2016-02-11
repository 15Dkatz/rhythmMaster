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
 		4: "w"
 	}

 	var next = false;

 	$scope.drumSound = ngAudio.load("sounds/SD0000.mp3");
	$scope.drumSound.volume = "1.0";
	var accuracies = [];

 	var KeyRhythm = function (key) {
 		globalAccuracy=0;
 		$scope.accuracyCount=0;
 		next=false;
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

	 	var gameTappy = new tappy.Rhythm(gameRhythm);
	 	var userTappy = new tappy.Rhythm();


	 	//clear accuracy!! clear the tappy rhythm

	 	$scope.$on('keydown', function(event, e) {
	 		if (e.which === keycodes[key]) {
	 			console.log(key, "tapped");

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
	 		musiSyncNotes[f] = numNotePairs[musiSyncNotes[f]];
	 		musiSyncNotesString += musiSyncNotes[f];
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
 	}

 	//perhaps use to create rests!
 	var keyF = new KeyRhythm("F");
 	$scope.keyFDisplay = keyF.musiString;

 	var keyJ = new KeyRhythm("J");
 	$scope.keyJDisplay = keyJ.musiString;

 	console.log(keyF.musiString, "FmusiString", keyJ.musiString, "JmusiString");


	$(document).ready(function() {	
		$(document).click(function() {
			if (next===true) {
				$('.rhythmHead').removeClass("fadeIn");
				$('.rhythmHead').addClass("animated fadeOut");
				console.log("new", next);
				keyF = new KeyRhythm("F");
				$scope.keyFDisplay = keyF.musiString;

				keyJ = new KeyRhythm("J");
				$scope.keyJDisplay = keyJ.musiString;
			} else {
				console.log(next, "false");
			}

		})
 	})
});

//use wad.js for sounds on each tap, and a css animation wave effect for the drum animation.