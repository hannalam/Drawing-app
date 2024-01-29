function LineToTool(){
	this.icon = "assets/lineTo.png";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
	var strokeWidth = 2;

	this.draw = function(){
        strokeWeight(strokeWidth);
        //Check when the mouse is clicked
		if(mouseIsPressed){
            
            //when mouse is at -1, means we have not started draw yet 
			if(startMouseX == -1){
                //start to record the starting mouse point and begin to draw
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
                //to keep all drew lines before clear, load to memory 
				loadPixels();
			}

			else{
                //to show only one line in the whiteborad
                //clear the background 
				updatePixels();
                //draw the line over the canvas
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
        //When the mouse have not click
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
		strokeWeight(1);
	};

	//adds a slide range and click handler to the options area. When clicked
	//adjust the thickness of the stroke
	this.populateOptions = function() {
		select(".options").html(
			"<div>Line Width: <input type='range' id='pencilWidth'  min='1' max='50' step='1'>From 1 to 50<\/div>");
		select("#pencilWidth").value(strokeWidth);
		// 	//click handler
		select("#pencilWidth").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
					strokeWidth = newWidth;
				} else {
					this.value(strokeWidth);
				}
			}
		});
	};


}

