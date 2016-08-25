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

	easeOutExpo :
		function (x, t, b, c, d) {
			return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
		},

	easeInExpo : 
		function (x, t, b, c, d) {
			return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
		},
}



var sodaCanvas = {};


sodaCanvas.animateSingle = function(parameter, newPosition, easing, totalTime) {
	return new Promise((resolve, reject) => {

		var runThisPromise = 'emptyPromise'
		for (var i = 0; i < this.currentlyAnimating.length; i++) {	// checking if object is already animating:
		    if (this.currentlyAnimating[i] == parameter) {
				runThisPromise = 'break';
			}
		}

		this[runThisPromise](parameter).then((debug) => { 			// if an object is running the runThisPromise will be 'Break' else it will be an empty instant resolving promise
			this.currentlyAnimating.push(parameter);

			var breakThis = false 
			var currentFrame = 0; 				
			var totalFrames = totalTime / 1000 * frameRate; 
			var start = this[parameter]; 		
			var end = newPosition - this[parameter];

			var clock = setInterval(() => {
				var elaspedTime = currentFrame / frameRate * 1000;
				var percentageDone = currentFrame / totalFrames; 

				for (var i = 0; i < this.breakAnimation.length; i++) {
					if(this.breakAnimation[i] === parameter){ // if i
						clearInterval(clock);

						this.currentlyAnimating.splice(this.currentlyAnimating.indexOf(parameter), 1); 	//deleting animations from array:
						
						this.breakAnimation.splice(this.breakAnimation.indexOf(parameter), 1); 			//and from break Array:
						
						//console.log( 'deleted ' + parameter + ' left: ' + (this.breakAnimation[i] ? this.breakAnimation[i] : 'nothing') );
						breakThis = true;
					}

					if(this.breakAnimation.length > 0 && i == this.breakAnimation.length){
						clearInterval(clock)
						resolve();
						breakThis = true;
					}
				}

				if(currentFrame > totalFrames) {
					clearInterval(clock) //clearing timer, and resolving promise
					this[parameter] = newPosition;
					resolve();

					var indexOfParameter = this.currentlyAnimating.indexOf(parameter); //deleting animations from array.
					this.currentlyAnimating.splice(indexOfParameter, 1);
					breakThis = true;

				}

				if(!breakThis) { 
					this[parameter] = easing(percentageDone, elaspedTime, start, end, totalTime)
					currentFrame++;
				}

			}, (1000/frameRate))
		})
	});
}



sodaCanvas.animate = function(animations, easing, totalTime) {
	var promises = new Array();
	for(var i=0; i < Object.keys(animations).length;i++) {
		promises[i] = new Promise((resolve, reject) => {
			var currentKey = Object.keys(animations)[i];
			this.animateSingle(currentKey, animations[currentKey], easing, totalTime)
			.then(resolve);
		});
	}
	//console.log('now animating ' + this.currentlyAnimating)
	return Promise.all(promises).then(() => this.breakAnimation = new Array)
};



sodaCanvas.break = function(parameter) {
	return new Promise((resolve, reject) => {
		if(this.currentlyAnimating)
		this.breakAnimation.push(parameter);
		resolve();
	});
}

