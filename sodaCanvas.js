var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");
var frameRate = 50;
function rect(_x, _y, _width, _height, _color) {
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.color = _color;
	this.center = [this.width/2, this.height/2]; // not opdated when w / h is changed.. Should be done via get/set

	this.draw = () => {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.animate = (parameter, newPosition, easing, totalTime) => { //gør mere generical skal kunne modtage json amimaTIONER og sende dem aftsted til denne function 
		clearInterval(clock)
		
		var currentFrame = 0; 				var totalFrames = totalTime / 1000 * frameRate; 
		var start = this[parameter]; 		var end = newPosition - this[parameter];

		var clock = setInterval(() => {
			console.log(parameter +': ' + this[parameter])
			elaspedTime = currentFrame / frameRate * 1000;
			percentageDone = currentFrame / totalFrames; 

			this[parameter] = easing(percentageDone, elaspedTime, start, end, totalTime)
			currentFrame++;

			if(currentFrame > totalFrames) clearInterval(clock);
		}, (1000/frameRate))

		return new Promise((resolve, reject) => {
			console.log('new')//ensuring the position is 100% correct no matter the animation
			setInterval(resolve, totalTime)
		});
	}
};

setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
bg.center = [0,0]
var sodaRect = new rect(100, 100, 30, 30, "grey");


function draw(){
	bg.draw();
	sodaRect.draw();
}



$( document ).ready(() => {
	$( document ).click( () => {
		var x = event.clientX;
		var y = event.clientY;
		sodaRect.animate('x', x, easing.easeInOutExpo, 1000)
		sodaRect.animate('y', y, easing.easeInOutExpo, 1000).then(() => {
			sodaRect.animate('x', 0, easing.easeInOutExpo, 1000);
			sodaRect.animate('y', 0, easing.easeInOutExpo, 1000);
		})
	})
})




easing = {
	linear : 
		function(percent, elapsed, start, end, total) {
    		return start+(end-start)*percent;
    	},

	easeInQuad : 
		function (x, t, b, c, d) {
    		return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
    	},

    easeInElastic :
    	function (x, t, b, c, d) {
		    var s=1.70158;var p=0;var a=c;
		    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		    if (a < Math.abs(c)) { a=c; var s=p/4; }
		    else var s = p/(2*Math.PI) * Math.asin (c/a);
		    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},

	easeInOutExpo : 
		function (x, t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
			t--;
			return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
		},
}