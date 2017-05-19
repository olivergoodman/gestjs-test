$(document).ready(function() {
	// jQuery
	$.getScript('../static/js/record_video.js', function()
	{
    	// The number of gesture snippets to be recorded
    	var MAX_NUMBER_GESTURES = 4;

    	// The current count for the number of gesture snippets recorded
    	var COUNT = 0;

    	// Keep track if we are at the first press (start recording) or 2nd (end recording)
    	var FIRST_PRESS = false;

    	// The different directions that will be recorded
    	var DIRECTIONS = ["up", "down", "left", "right", "up", "down", "left", "right"]
    	// and set the first direction
    	$("#modal-dir").text(DIRECTIONS[0]);

    	// Get the modal
    	var modal = document.getElementById('myModal');

    	// Get the button that opens the modal
    	var btn = document.getElementById("myBtn");

    	// Get the <span> element that closes the modal
    	var span = document.getElementsByClassName("close")[0];

    	// When the user clicks the button, open the modal 
        modal.style.display = "block";

    	// When the user clicks on <span> (x), close the modal
    	span.onclick = function() {
    	    modal.style.display = "none";
    	}

    	// zip file of vid snippets to download
    	var zip = new JSZip();

    	// Recognize key presses
    	document.onkeypress = function(evt) {
    	    evt = evt || window.event;
    	    var charCode = evt.keyCode || evt.which;
    	    if (charCode == 32 && COUNT < MAX_NUMBER_GESTURES) {
    	    	FIRST_PRESS = !FIRST_PRESS;
    	    	
    	    	//start recording:
    	    	if (FIRST_PRESS == true) {
    	    		console.log('start recording');
    	    		onBtnRecordClicked();
    	    	}

    	    	// end recording:
    	    	else {
    	    		COUNT++;
    	    		// when space is pressed load next instruction
    	    		onBtnStopClicked();

    				$("#modal-dir").text(DIRECTIONS[COUNT]);
    				console.log("finished recording", COUNT);
    	    	}
    	    }

    	    // close modals after reached MAX_NUMBER_GESTURES
    	    if (COUNT >= MAX_NUMBER_GESTURES) {
    	    	modal.style.display = "none";
    	    }  
    	};
	});
});