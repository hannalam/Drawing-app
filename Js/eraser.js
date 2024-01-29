function Eraser(){
    this.icon = "assets/eraser.png";
    this.name = "Eraser"

    var previousMouseX = -1;
	var previousMouseY = -1;
	var strokeWidth = 30;

	this.draw = function(){
		strokeWeight(strokeWidth);
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				loadPixels();
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                stroke(255);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
		//set always in white color
		stroke(0);
		strokeWeight(1);
	};

	//adds a slide range and click handler to the options area. When clicked
	//adjust the thickness of the stroke
	this.populateOptions = function() {
		select(".options").html(
			"<div>Eraser Thickness: <input type='range' id='pencilWidth'  min='1' max='100' step='30'>From 1 to 100</div>");
		select("#pencilWidth").value(strokeWidth);
		// 	//click handler
		select("#pencilWidth").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 101) {
					strokeWidth = newWidth;
				} else {
					alert("Not a valid input");
					this.value(strokeWidth);
				}
			}
		});
	};
}