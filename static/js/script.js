$(document).ready(function() {
	gest.options.debug(true); //show gesture video feed

	var prediction = new GesturePrediction("left", [], false, "gest.js");
	var actual = new GestureActual("right", [], false, "src");

	console.log(prediction.test());
	console.log(actual);


	// start gesture recording
	$("#gest-start").click(function() {
		gest.start();
		gest.options.subscribeWithCallback(function(gesture) {
			$("#direction-log")[0].innerHTML = gesture.direction;

			// can handle individual directions:
		    if (gesture.up) {
		    	console.log(gesture.direction);
		    } else if (gesture.down) {
		    	console.log(gesture.direction);
		    } else if (gesture.left) {
		    	console.log(gesture.direction);
		    } else if (gesture.right) {
		    	console.log(gesture.direction);
		    } else {
		    	console.log(gesture.error);
		    }
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

	
	/*
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	* Creating the Gesture Object Prototype and it's children
	* ----------------------------------------------------------------------------------------------------------------------------------
	* ----------------------------------------------------------------------------------------------------------------------------------
	*/

	// Function to create inheritance between parent and child classes
	function inheritPrototype(childObject, parentObject) {
		// As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject​
		// So the copyOfParent object now has everything the parentObject has ​
		var copyOfParent = Object.create(parentObject.prototype);

		//Then we set the constructor of this new object to point to the childObject.​
		// Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.​
		copyOfParent.constructor = childObject;

		// Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)​
		childObject.prototype = copyOfParent;
	}

	///// Parent GestureObject class
	function GestureObject(direction, session_log, visible, source) {
		this.direction = direction;
		this.session_log = session_log;
		this.visible = visible;
		this.source = source;
	}

	///// GesturePrediction, child of Gesture Object
	function GesturePrediction(direction, session_log, visible, source) {
		GestureObject.call(this, direction, session_log, visible, source);
	}
	// inherit GestureObject
	inheritPrototype(GesturePrediction, GestureObject);

	GesturePrediction.prototype.test = function() {
		return this.direction;
	}

	///// GestureActual, child of Gesture Object
	function GestureActual(direction, session_log, visible, source) {
		GestureObject.call(this, direction, session_log, visible, source);
	}
	// inherit GestureObject
	inheritPrototype(GestureActual, GestureObject);

	GestureActual.prototype.test2 = function() {
		return this.direction;
	}


});