var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");
var frameRate = 50;
function rect(_x, _y, _width, _height, _color) {
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.color = _color;
	
	this.draw = () => {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.animate = (parameter, newPosition, easing, time) => { //gør mere generical skal kunne modtage json amimaTIONER og sende dem aftsted til denne function 

		var start = x;
		var end = newPosition;
		var total = time;

		var clock = setInterval(() => {
			this[parameter] = linear(percent, elapsed, start, end, total)
			currentFrame++;

			if(currentFrame > totalFrames) clearInterval(clock);
		}, (1000/frameRate))

		return new Promise((resolve, reject) => setInterval(resolve, time) );
	}
};

setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
var sodaRect = new rect(100, 100, 30, 30, "red");


function draw(){
	bg.draw();
	sodaRect.draw();
}

var linear = function(percent,elapsed,start,end,total) {
    return start+(end-start)*percent;
}



$( document ).ready(() => {
	$( document ).click( () => {
		var x = event.clientX;
		var y = event.clientY;
		sodaRect.animate('x', x, easing, 1000)
	})
})


