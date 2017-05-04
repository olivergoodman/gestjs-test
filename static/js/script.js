$(document).ready(function() {
	gest.options.debug(true); //show gesture video feed

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

	// toggle controls for skin filtering
	$(".toggle").prop('checked', false).change();

	$('#toggle-skin-filter').change(function() {
		if ($(this).prop('checked')){
			gest.options.skinFilter(true); 
		} else {
			gest.options.skinFilter(false); 
		}
	});


	


})