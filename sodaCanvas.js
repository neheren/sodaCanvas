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
		
		var totalFrames = time / 1000 * frameRate; // total frames acording to time set
		var currentFrame = 0;

		var oldPosition = this[parameter];
		var distance = newPosition - oldPosition;
		console.log({oldPosition}, {newPosition}, {distance})

		var linearRatio = (totalFrames / easing(totalFrames));
		var timeRatio = distance / totalFrames;

		var clock = setInterval(() => {
			this[parameter] = easing(currentFrame) * linearRatio * timeRatio + oldPosition
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

var easing = function(t){
	//return 1+(--t)*t*t*t*t
	return Math.pow(t, 0.3)
}

$( document ).ready(() => {
	$( document ).click( () => {
		var x = event.clientX;
		var y = event.clientY;
		sodaRect.animate('x', x, easing, 1000)
		.then(() => (sodaRect.animate('y', y, easing, 500)))
		.then(() => (sodaRect.animate('x', (0), easing, 500)))
		.then(() => (sodaRect.animate('y', (0), easing, 500)))
	})
})






EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}