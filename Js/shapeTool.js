function ShapeTool(){
    this.icon = "assets/shape.png"; 
	this.name = "Shape";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
	var strokeWidth = 5;
	var cir = false;
	var rec = false;
	var tri = false;


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

			else {
                //to show only one line in the whiteborad
                //clear the background 
				updatePixels();
                //draw the line over the canvas
                ellipseMode(CORNERS);
                ellipse(startMouseX, startMouseY, mouseX, mouseY);
			}

			if(cir){
				updatePixels();
				ellipse(startMouseX, startMouseY, mouseX, mouseY);
			}
			if(tri){
				updatePixels();
				triangle(startMouseX - mouseX, startMouseY + mouseY, startMouseX, startMouseY - mouseY,  startMouseX + mouseX, startMouseY + mouseY);
				//triangle(startMouseX, startMouseY, mouseX - startMouseX/8, mouseY + startMouseY, mouseX + startMouseX/8, mouseY + startMouseY);
			}
			if(rec){
				updatePixels();
				rect(startMouseX, startMouseY, mouseX-startMouseX, mouseY-startMouseY);
			}

		}

        //When the mouse have not click
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
	
	//when the tool is deselected update the pixels to just show the drawing and
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	this.circleOptions = function() {
		select(".options").html(
			"<div>Shape Thickness: <input type='range' id='pencilWidth'  min='1' max='50' step='5'>From 1 to 50<button id='fillButton' class='button'>No Fill</button><br><button id='circle' class='button'>Circle</button> <button id='triangle' class='button' onclick='this.triangle'>Triangle</button> <button id='square' class='button'>Square</button><br><p>Fill color by clicking the color palette at the left</p> </div>");	
		//click handler
		//unfill the color of the shape
		select("#fillButton").mouseClicked(function() {
			noFill();
		});

		//click handler
		//draw a circle shape
		select("#circle").mouseClicked(function() {
			rec = false;
			tri = false;
			if(cir){
				cir = false;
			}
			else{
				updatePixels();
				cir = true;
			}		
		});

		//click handler
		//draw a triangle shape
		select("#triangle").mouseClicked(function() {
			rec = false;
			cir = false;
			if(tri){
				tri = false;
			}
			else{
				updatePixels();
				tri = true;
			}
		});

		//click handler
		//draw a square shape
		select("#square").mouseClicked(function() {
			tri = false;
			cir = false;
			if(rec){
				rec = false;
			}
			else{
				updatePixels();
				rec = true;
			}
		});

		//adds a slide range and click handler to the options area. When clicked
		//adjust the thickness of the stroke
		select("#pencilWidth").value(strokeWidth);
		// 	//click handler
		select("#pencilWidth").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
					strokeWidth = newWidth;
				} else {
					alert("Not a valid input");
					this.value(strokeWidth);
				}
			}
		});
		
	};
	
}
