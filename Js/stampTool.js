function StampTool(){
    this.icon = "assets/stamp.png";
    this.name = "star";

    var SizeSlider = 20;
    var nSlider = 1;
    //var star = false;
    //var paw = false;


    this.draw = function()
    {
      if(mouseIsPressed){
        loadPixels();
        for(var i = 0; i < nSlider; i++) {
        var Size = SizeSlider;
        var X = random((mouseX - Size/2) - 10, (mouseX - Size/2) + 10 );
        var Y = random((mouseY - Size/2) - 10, (mouseY - Size/2) + 10 );
        image(star, X + 50, Y + 50, Size, Size);
        image(paw, X, Y, Size, Size);

          //this is the difficult part that i cannot fix, i tried many methods, it is the best version that
          //is not making other function collapse
          if(star){
            //image(star, X, Y, Size, Size);
              } 
          if(paw){
            //image(paw, X, Y, Size, Size);
          }
        }  
      } 
    }

    this.unselectTool = function() {
      updatePixels();
      //clear options
      select(".options").html("");
    };

    this.stampOptions = function() {

        select(".options").html(
            "<div id='numberOfStarsControl'> Number of Stamp: <input type='range' id='nStarSlider'  min='1' max='20' step='1'>From 1 to 30 <br>  Size of Stamp: <input type='range' id='starSizeSlider'  min='1' max='50' step=10'>From 5 to 50<br><img id='star' class='stamp' src ='assets/star.png'><img id='paw' class='stamp' src ='assets/paw.png'></div>");
        
            select("#star").mouseClicked(function() {
          //paw = false;
          if(star){
            //star = false;
          }
          else{
            updatePixels();
            star = true;
          }
        });

        select("#paw").mouseClicked(function() {
          //star = false;
          if(paw){
            //paw = false; 
          }
          else{
            updatePixels();
            paw = true;
          }
        });
        
        select("#nStarSlider").value(nSlider);
        select("#nStarSlider").input(function() {
          if (this.value() !== "") {
            var newWidth = parseInt(this.value());
            if (!isNaN(newWidth) && newWidth > 0 && newWidth < 21) {
              nSlider = newWidth;
            } else {
              alert("Not a valid input");
              this.value(nSlider);
            }
          }
        });
        select("#starSizeSlider").value(SizeSlider);
        select("#starSizeSlider").input(function() {
          if (this.value() !== "") {
            var newWidth = parseInt(this.value());
            if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
              SizeSlider = newWidth;
            } else {
              alert("Not a valid input");
              this.value(SizeSlider);
            }
          }
        });
    }

    //updatePixels();
}
