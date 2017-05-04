$(document).ready(function() {
	gest.options.debug(true); //show gesture video feed

	// gest.options.skinFilter(true); 
	console.log(gest.options)

	var slide = document.getElementById('gest-slider'),
	    sliderText = document.getElementById("gest-sensitivity");

	slide.onchange = function() {
	    sliderText.innerHTML = this.value;
	    gest.options.sensitivity(slide.valueAsNumber);
	}


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

	$("#skin-on").click(function() {
		gest.options.skinFilter(true);
	})

	$("#skin-off").click(function() {
		gest.options.skinFilter(false);
	})


	


})