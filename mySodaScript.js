var c;
var ctx;
var sodaRect;
var sodaRects;
var frameRate
var offset

// context.clearRect(0,0,width,height);


$(document).ready(function(){

	c = document.getElementById("sodaCanvas");
	ctx = c.getContext("2d");
	frameRate = 60;
	offset = {};
	offset.y = c.offsetTop;
	offset.x = c.offsetLeft;
	console.log(offset)

	$(c).click(() => {
			console.log('clciked canvas')
	})

	setInterval(() => draw(bg), (1000/frameRate))

	var bg = new rect(0, 0, 1920, 1000, "#808080");
	bg.center = [0,0];

	var sodaImg = new image(1920/2 - 276/2, 500-276/2 - 5, 200, 200, "logosmall.png");
	sodaRects = new Array()


	for (var i = 0; i < 100; i++) {
		sodaRects[i] = new rect(20*i, 0, 100, 1000, "white")
	}

	loop();

	widthOfOuterRect = 700;
    sodaRect = new rect(window.innerWidth/2 - widthOfOuterRect/2, window.innerHeight/2 - widthOfOuterRect/2, widthOfOuterRect, widthOfOuterRect, 'white');
	sodaRect.clicked(() => sodaRect.animate({width:0, height:0}, easing.easeInOutExpo, 1000));
	sodaRect.mouseOver(() => console.log('mouseOver'))

	sodaRect.mouseAway(() => console.log('away'))

})


function draw(bg){
	bg.draw();

	for (var i = 0; i < 100; i++) {
		//sodaRects[i].draw();
	}
	sodaRect.draw();
	
}


//$( document ).ready(() => {

function loop(){

	for (var i = 0; i < 100; i++) {
		sodaRects[i].animate({
			width:20,
		}, easing.easeInOutExpo, 1000)
	}
}

$( document ).ready(() => {

})


