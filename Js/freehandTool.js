function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";
	
	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	
	var editMode = false;
    var currentShape = [];
	var strokeWidth = 2;

	this.draw = function()
	{
		updatePixels();
		strokeWeight(strokeWidth);
		
		//if the mouse is pressed
		if(mouseIsPressed){

 
			if(mouseX > 0 && mouseX < 1400 && mouseY > 0 && mouseY < 1000){
				if(!editMode){
					currentShape.push({
						x:mouseX,
						y:mouseY
					});
            	}
				else{
					for(var i = 0; i < currentShape.length; i++){
						if(dist(currentShape[i].x,currentShape[i].y,mouseX,mouseY) < 15) {
							currentShape[i].x = mouseX;
							currentShape[i].y = mouseY;
						}
					}
				}
            }
        }

        beginShape();
        noFill();
        for(var i = 0; i < currentShape.length; i++){
            vertex(currentShape[i].x, currentShape[i].y);
            if(editMode){
                fill('purple');
                ellipse(currentShape[i].x,
                       currentShape[i].y,
                       10);
                noFill();
            }
        }
        endShape();
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
			"<div>Pencil Width: <input type='range' id='pencilWidth'  min='1' max='50' step='2'>From 1 to 50<br><br><button id='editShapeButton' class='button'>Edit Shape</button><button id='finishShapeButton' class='button'>Finish Shape</button></div>");
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

		//adds two buttons and click handler to the options area. When clicked (Edit Shape)
		//changed to (Add Vertices) and the vertices pop up
		//When clicked (Add Vertices) change back to (Edit Shape)
		select("#editShapeButton").mouseClicked(function(){
			var editShapeButton = select("#" + this.elt.id);
			if(editMode){
				editMode = false;
				editShapeButton.html('Edit Shape');
			}
			else{
				//updatePixels();
				editMode = true;
				editShapeButton.html('Add Vertices');
			}
		});
		
		//When clicked (Finish Shape) end the edit mode
		select("#finishShapeButton").mouseClicked(function(){
			editMode = false;
			currentShape = [];
			loadPixels();
		});
		
	};
	//updatePixels();
	
}


		
