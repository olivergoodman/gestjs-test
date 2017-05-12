$(document).ready(function() {
	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* Gesture Objects 
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/

	///// Predicted gesture class
	function GesturePrediction(direction, sensitivity, skin_filter, timestamp, count) {
		this.direction = direction;
		this.sensitivity = sensitivity;
		this.skin_filter = skin_filter;
		this.timestamp = timestamp;
		this.count = count;
	}

	GesturePrediction.prototype.test = function() {
		return this.direction;
	}

	///// Actual gesture class
	function GestureActual(direction, timestamp, count) {
		this.direction = direction;
		this.timestamp = timestamp;
		this.count = count;
	}

	///// Class to keep track of last direction / log of session's directions
	function GestureLog(name, direction, session_log) {
		this.name = name;
		this.direction = direction;
		this.session_log = session_log;
	}

	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* Generate GestureActual objects to be predicted  
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/


	// create a new gesture object to be generated
	function generateGesture() {
		var random_direction = Math.floor(Math.random() * 4) + 1;
		var dir;
		if (random_direction === 1) {
			$("#arrow-up").addClass("arrow-up-highlight");
			dir = "Up";
		} else if (random_direction === 2) {
			$("#arrow-left").addClass("arrow-left-highlight");
			dir = "Left";
		} else if (random_direction === 3) {
			$("#arrow-right").addClass("arrow-right-highlight");
			dir = "Right";
		} else if (random_direction === 4) {
			$("#arrow-down").addClass("arrow-down-highlight");
			dir = "Down";
		}
		return dir;		
	}

	// store the last actual gesture into the actual log
	function recordActualGesture(actual_log, direction, timestamp) {
		var current_gesture = new GestureActual(direction, timestamp, COUNT);
		actual_log.session_log.push(current_gesture);
		actual_log.direction = direction;
	}

	// clear the arrows of any highlighted classes
	function removeHighlights() {
		$("#arrow-up").removeClass("arrow-up-highlight");
		$("#arrow-left").removeClass("arrow-left-highlight");
		$("#arrow-right").removeClass("arrow-right-highlight");
		$("#arrow-down").removeClass("arrow-down-highlight");
	}

	// store the read gesture from the webcam into the prediction log
	function recordPredictedGesture(prediction_log, read_gesture, timestamp) {
		var read = new GesturePrediction(read_gesture.direction, SENSITIVITY, SKIN_FILTER, timestamp, COUNT);
		prediction_log.session_log.push(read);
		prediction_log.direction = read_gesture.direction;
	}

	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* UI Controls
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/	

	// Globals
	var PREDICTION_LOG = new GestureLog("predictions", "none", []);
	var ACTUAL_LOG = new GestureLog("actual", "none", []);
	var COUNT = 1;
	var SKIN_FILTER = false;
	var SENSITIVITY = 80;
	var LAST_READ_ACTUAL = "none";

	//testing make-gesture
	$("#make-gesture").click(function() {
		removeHighlights();
		generateGesture(ACTUAL_LOG);
	});


	gest.options.debug(true); //show gesture video feed
	// start gesture recording
	$("#gest-start").click(function() {
		recording = true;
		gest.start();

		// make the first gesture to be read
		LAST_READ_ACTUAL = generateGesture(ACTUAL_LOG);
		var start_time = new Date().getTime();

		// read incoming read gestures
		gest.options.subscribeWithCallback(function(gesture) {
			removeHighlights();
			var timestamp = new Date().getTime();
			recordActualGesture(ACTUAL_LOG, LAST_READ_ACTUAL, start_time);
			LAST_READ_ACTUAL = generateGesture(ACTUAL_LOG, timestamp);
			recordPredictedGesture(PREDICTION_LOG, gesture, timestamp);
			$("#direction-log")[0].innerHTML = gesture.direction;
			$("#count-log")[0].innerHTML = COUNT;
			COUNT++;
		});	
	});

	// stop gesture recording
	$("#gest-stop").click(function() {
		console.log("actual: ", ACTUAL_LOG);
		console.log("read: ", PREDICTION_LOG);
		recording = false;
		gest.stop();

		
	})

	// toggle controls for skin filtering
	$("#toggle-skin-filter").prop('checked', false);
	$('#toggle-skin-filter').change(function() {
		if ($(this).prop('checked')){
			gest.options.skinFilter(true); 
			SKIN_FILTER = true;
		} else {
			gest.options.skinFilter(false); 
			SKIN_FILTER = false;
		}
	});

	// gesture sensitivity
	var slide = document.getElementById('gest-slider'),
	    sliderText = document.getElementById("gest-sensitivity");
	slide.onchange = function() {
	    sliderText.innerHTML = this.value;
	    gest.options.sensitivity(slide.valueAsNumber);
	    SENSITIVITY = slide.valueAsNumber;
	}


});