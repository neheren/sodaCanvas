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
		//console.log('now breaking ' + parameter + ', and waiting for promise')
		this.break(parameter).then((debug) => {
			//console.log('promise recieved, with message: ' + debug )
			this.currentlyAnimating.push(parameter);

			var currentFrame = 0; 				
			var totalFrames = totalTime / 1000 * frameRate; 
			var start = this[parameter]; 		
			var end = newPosition - this[parameter];

			var clock = setInterval(() => {
				var elaspedTime = currentFrame / frameRate * 1000;
				var percentageDone = currentFrame / totalFrames; 

				for (var i = 0; i < this.breakAnimation.length; i++) {
					if(this.breakAnimation[i] === parameter){
						clearInterval(clock);
						//console.log(this.currentlyAnimating)
						
						//deleting animations from array:
						this.currentlyAnimating.splice(this.currentlyAnimating.indexOf(parameter), 1);
						
						//and from break Array:
						this.breakAnimation.splice(this.breakAnimation.indexOf(parameter), 1);
						
						console.log('deleted ' + parameter + ' from ' + this.breakAnimation)
						currentFrame = totalFrames + 1 // simple way of going into the if below
					}
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
		
		for (var i = 0; i < this.currentlyAnimating.length; i++) {//checking if object is already animating:
		    if (this.currentlyAnimating[i] == parameter) {
				this.breakAnimation.push(parameter); 
				setTimeout(() => resolve('breaking parameter: ' + parameter), 200)
				console.log('breaking parameter: ' + parameter)
			}else{
				resolve(parameter + ' is not animating so is not being breaked')}
				console.log(parameter + ' is not animating so is not being breaked')
		}
		if(this.currentlyAnimating.length == 0){
			resolve('nothing is animating, nothing to break')
		}
	});
}

