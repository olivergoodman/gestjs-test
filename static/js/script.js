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

	const UP = 0;
	const LEFT = 1;
	const RIGHT = 2;
	const DOWN = 3;

	// create a new gesture object to be generated
	function generateGesture() {
		console.log('not implemented yet');
		return false;
	}

	function displayGesture() {
		console.log('not implemented yet');
		return false;
	}

	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* UI Controls
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/

	var prediction = new GesturePrediction("left", [], 80, false, 3);
	var actual = new GestureActual("right", [], 3);
	console.log(prediction);
	console.log(actual);


	gest.options.debug(true); //show gesture video feed

	// start gesture recording
	$("#gest-start").click(function() {
		gest.start();
		gest.options.subscribeWithCallback(function(gesture) {
			$("#direction-log")[0].innerHTML = gesture.direction;
			console.log(gesture.direction);

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