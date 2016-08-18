var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");
var frameRate = 60;


function rect(_x, _y, _width, _height, _color) {
	this.emptyPromise = (parameter) => new Promise((resolve, reject) => resolve()) 
	
	this.currentlyAnimating = new Array();
	this.breakAnimation = new Array();


	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;

	this.color = w3color(_color, null)

	this.rColor = this.color.red;
	this.gColor = this.color.green;
	this.bColor = this.color.blue;
	this.aColor = this.color.opacity;

	this.rbg = function () {
		return "rgba("+Math.round(this.rColor)+","+Math.round(this.gColor)+","+Math.round(this.bColor)+","+ Math.round(this.aColor) +")";
	}

	this.center = [this.width/2, this.height/2]; // not opdated when w / h is changed.. Should be done via get/set
	
	//this.animateColor ?= 

	this.draw = () => {
		ctx.fillStyle = this.rbg(); //could be optimized
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.break = sodaCanvas.break
	this.animateSingle = sodaCanvas.animateSingle;
	this.animate = sodaCanvas.animate;
	
};

