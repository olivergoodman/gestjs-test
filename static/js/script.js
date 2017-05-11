$(document).ready(function() {
	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* Gesture Objects 
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/

	///// Prediction class
	function GesturePrediction(direction, session_log, sensitivity, skin_filter, timestamp) {
		this.direction = direction;
		this.session_log = session_log;
		this.sensitivity = sensitivity;
		this.skin_filter = skin_filter;
		this.timestamp = timestamp;
	}

	GesturePrediction.prototype.test = function() {
		return this.direction;
	}

	///// Actual class
	function GestureActual(direction, session_log, timestamp) {
		this.direction = direction;
		this.session_log = session_log;
		this.timestamp = timestamp;
	}

	GestureActual.prototype.test = function() {
		return this.direction;
	}

	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* Generate GestureActual objects to be predicted  
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/


	// create a new gesture object to be generated
	function generateGesture(actual_gesture) {
		var random_direction = Math.floor(Math.random() * 4) + 1;
		var dir;

		if (random_direction === 1) {
			$("#arrow-up").addClass("arrow-up-highlight");
			dir = "up";
		} else if (random_direction === 2) {
			$("#arrow-left").addClass("arrow-left-highlight");
			dir = "left";
		} else if (random_direction === 3) {
			$("#arrow-right").addClass("arrow-right-highlight");
			dir = "right";
		} else if (random_direction === 4) {
			$("#arrow-down").addClass("arrow-down-highlight");
			dir = "down";
		}

		var current_gesture = {
			direction: dir, 
			timestamp: actual_gesture.timestamp
		};
		
		actual_gesture.session_log.push(current_gesture);
		actual_gesture.direction = dir;


	}

	function removeHighlights() {
		$("#arrow-up").removeClass("arrow-up-highlight");
		$("#arrow-left").removeClass("arrow-left-highlight");
		$("#arrow-right").removeClass("arrow-right-highlight");
		$("#arrow-down").removeClass("arrow-down-highlight");
	}

	function recordPredictedGesture(predicted_gesture, read_gesture) {
		var read = {
			direction: read_gesture.direction,
			timestamp: read_gesture.timestamp
		}
		predicted_gesture.session_log.push(read);
		predicted_gesture.direction = read_gesture.direction;
	}

	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* UI Controls
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/	

	//Globals
	var RECORDING = false;

	// testing
	var PREDICTION = new GesturePrediction("none", [], 80, false, 3);
	var ACTUAL = new GestureActual("none", [], 3);
	var COUNT = 0;

	//testing make-gesture
	$("#make-gesture").click(function() {
		removeHighlights();
		generateGesture(ACTUAL);
		// console.log(ACTUAL)
	});


	gest.options.debug(true); //show gesture video feed
	// start gesture recording
	$("#gest-start").click(function() {
		recording = true;
		gest.start();

		// make the first gesture to be read
		generateGesture(ACTUAL);

		// read incoming read gestures
		gest.options.subscribeWithCallback(function(gesture) {
			console.log(COUNT);
		
			removeHighlights();
			generateGesture(ACTUAL);
			recordPredictedGesture(PREDICTION, gesture);
			$("#direction-log")[0].innerHTML = gesture.direction;
			$("#count-log")[0].innerHTML = COUNT;

			console.log("actual: ", ACTUAL);
			console.log("read: ", PREDICTION)

			COUNT++;


			// can handle individual directions:
		    // if (gesture.up) {
		    // 	console.log(gesture.direction);
		    // } else if (gesture.down) {
		    // 	console.log(gesture.direction);
		    // } else if (gesture.left) {
		    // 	console.log(gesture.direction);
		    // } else if (gesture.right) {
		    // 	console.log(gesture.direction);
		    // } else {
		    // 	console.log(gesture.error);
		    // }
		});	
	});

	// stop gesture recording
	$("#gest-stop").click(function() {
		recording = false;
		gest.stop();
	})

	// toggle controls for skin filtering
	$("#toggle-skin-filter").prop('checked', false);
	$('#toggle-skin-filter').change(function() {
		if ($(this).prop('checked')){
			gest.options.skinFilter(true); 
		} else {
			gest.options.skinFilter(false); 
		}
	});

	// gesture sensitivity
	var slide = document.getElementById('gest-slider'),
	    sliderText = document.getElementById("gest-sensitivity");
	slide.onchange = function() {
	    sliderText.innerHTML = this.value;
	    gest.options.sensitivity(slide.valueAsNumber);
	}


});