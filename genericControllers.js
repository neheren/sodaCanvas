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



var sodaCanvas = {};



sodaCanvas.animateSingle = function(parameter, newPosition, easing, totalTime) {
	return new Promise((resolve, reject) => {

		this.currentlyAnimating.push(parameter);

		var currentFrame = 0; 				
		var totalFrames = totalTime / 1000 * frameRate; 
		var start = this[parameter]; 		
		var end = newPosition - this[parameter];

		var clock = setInterval(() => {
			var elaspedTime = currentFrame / frameRate * 1000;
			var percentageDone = currentFrame / totalFrames; 

			if(this.breakAnimation){
				clearInterval(clock);
				this.currentlyAnimating = new Array();
				currentFrame = totalFrames + 1 // simple way of going into the if below
				resolve();
			}

			if(currentFrame > totalFrames){
				clearInterval(clock) //clearing timer, and resolving promise
				resolve();

				var indexOfParameter = this.currentlyAnimating.indexOf(parameter); //deleting animations from array.
				this.currentlyAnimating.splice(indexOfParameter, 1);
			
			}else{ 
				this[parameter] = easing(percentageDone, elaspedTime, start, end, totalTime)
				currentFrame++;
			}

		}, (1000/frameRate))
	});
}



sodaCanvas.animate = function(animations, easing, totalTime) {
	for (var i = 0; i < this.currentlyAnimating.length; i++) {//checking if object is already animating:
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
			this.animateSingle(currentKey, animations[currentKey], easing, totalTime)
			.then(resolve);
		});
	}
	return Promise.all(promises).then(() => this.breakAnimation = false)
};



sodaCanvas.break = function() {
	return new Promise((resolve, reject) => {
		if(this.currentlyAnimating.length > 0){
			this.breakAnimation = true;
			setTimeout(resolve, 20)
		}else{resolve('nothings animating')}
	});
}

