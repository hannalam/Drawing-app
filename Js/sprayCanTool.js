//spray can object literal
function SprayCanTool(){
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.png";


	var points = 20;
    var spread = 25;
    var strokeWidth = 5;
    
    this.draw = function(){
        strokeWeight(strokeWidth);
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed){
            for(var i = 0; i < points; i++){
                point(random(mouseX-spread, mouseX + spread), 
                    random(mouseY-spread, mouseY+spread));
					loadPixels();
            }
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
			"<div>Spray Width: <input type='range' id='pencilWidth'  min='1' max='20' step=''>From 1 to 20 <br> Point: <input type='range' id='point'  min='10' max='60' step=''>From 10 to 60 <br> Spread: <input type='range' id='spread'  min='5' max='50' step=''>From 5 to 50</div>");
		select("#pencilWidth").value(strokeWidth);
		// 	//click handler
		select("#pencilWidth").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 31) {
					strokeWidth = newWidth;
				} else {
					this.value(strokeWidth);
				}
			}
		});
		select("#point").value(points);
		//click handler
		//adjust number of points
		select("#point").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 61) {
					points = newWidth;
				} else {
					this.value(points);
				}
			}
		});
		select("#spread").value(spread);
		//click handler
		//adjust area of spread
		select("#spread").input(function() {
			if (this.value() !== "") {
				var newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
					spread = newWidth;
				} else {
					this.value(spread);
				}
			}
		});
	};
}