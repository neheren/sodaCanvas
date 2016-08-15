var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");
var frameRate = 50;


sodaCanvas = {
	animate:
		function(parameter, newPosition, easing, totalTime) {
			return new Promise((resolve, reject) => {

				this.currentlyAnimating.push(parameter);
				// console.log(this.currentlyAnimating)
				var currentFrame = 0; 				var totalFrames = totalTime / 1000 * frameRate; 
				var start = this[parameter]; 		var end = newPosition - this[parameter];

				var clock = setInterval(() => {
					//console.log(parameter +': ' + this[parameter])
					var elaspedTime = currentFrame / frameRate * 1000;
					var percentageDone = currentFrame / totalFrames; 

					if(this.breakAnimation){
						clearInterval(clock);
						this.currentlyAnimating = new Array();
						currentFrame = totalFrames + 1 // simple way of going into the if below
					}

					if(currentFrame > totalFrames){

						clearInterval(clock)
						resolve();

						var indexOfParameter = this.currentlyAnimating.indexOf(parameter);
						this.currentlyAnimating.splice(indexOfParameter, 1)
						
						
					}else{
						this[parameter] = easing(percentageDone, elaspedTime, start, end, totalTime)
						currentFrame++;
					}

				}, (1000/frameRate))
			});
		}
}



function rect(_x, _y, _width, _height, _color) {
	this.currentlyAnimating = new Array();
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.color = _color;
	this.center = [this.width/2, this.height/2]; // not opdated when w / h is changed.. Should be done via get/set
	this.breakAnimation = false;

	this.draw = () => {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.break = () => {
		this.breakAnimation = true;
	}

	this.animateOne = sodaCanvas.animate;

	this.animate = function(animations, easing, totalTime){


		//checking if object is already animating:
		for (var i = 0; i < this.currentlyAnimating.length; i++) {
		    if (Object.keys(animations).indexOf(this.currentlyAnimating[i]) !== -1) {
		    	return new Promise( (resolve, reject) => 
		    		reject('Parameter ' + this.currentlyAnimating[i] + ' is already being animated. Use .break() method to cancel animation, or wait for the animation to complete') 
		    	)
		    }
		}
		

		var promises = new Array();
		for(var i=0; i < Object.keys(animations).length;i++) {
			promises[i] = new Promise((resolve, reject) => {
				var currentKey = Object.keys(animations)[i];
				this.animateOne(currentKey, animations[currentKey], easing, totalTime)
				.then(resolve)
			});
		}
		return Promise.all(promises).then(() => this.breakAnimation = false)
	};
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
		loop()
	})
})

function loop(){
	sodaRect.animate({x: Math.random() * 500, y: Math.random() * 500, width: 10+(Math.random() * 500), height: 10+(Math.random() * 500) }, easing.easeInOutExpo, 1000)//.then(()=>loop())
}



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