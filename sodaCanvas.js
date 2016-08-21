var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");
var frameRate = 60;

var onClick = document.createAttribute("onclick")
onClick.value = 'mouseClick(event)'
c.setAttributeNode(onClick);

var mouseClicked = false;

function mouseClick(event){
	console.log(event)
	mouseClicked = true;
}

function mouseRelease(event){
	mouseClicked = false;
}


function rect(_x, _y, _width, _height, _color) {
	this.emptyPromise = (parameter) => new Promise((resolve, reject) => resolve()) 
	
	this.currentlyAnimating = new Array();
	this.breakAnimation = new Array();


	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;

	this.color = w3color(_color, null);

	this.rColor = this.color.red;
	this.gColor = this.color.green;
	this.bColor = this.color.blue;
	this.aColor = this.color.opacity;

	this.rbg = function () {
		return "rgba("+Math.round(this.rColor)+","+Math.round(this.gColor)+","+Math.round(this.bColor)+","+ (this.aColor) +")";
	}

	this.center = [this.width/2, this.height/2]; // not opdated when w / h is changed.. Should be done via get/set

	this.clicked = (inpFunction) => {
		return new Promise((resolve, reject) => {
			if(mouseClicked){
				inpFunction();
				resolve();
			}
		})

	}	


	this.draw = () => {

		ctx.fillStyle = this.rbg(); //could be optimized
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	
	
	this.break = sodaCanvas.break
	this.animateSingle = sodaCanvas.animateSingle;
	this.animate = sodaCanvas.animate;
	//this.clicked = ()
	
};

function circle(_x, _y, _radius, _color) {
	this.emptyPromise = (parameter) => new Promise((resolve, reject) => resolve()) 
	
	this.currentlyAnimating = new Array();
	this.breakAnimation = new Array();


	this.x = _x;
	this.y = _y;
	this.radius = _radius;

	this.color = w3color(_color, null);

	this.rColor = this.color.red;
	this.gColor = this.color.green;
	this.bColor = this.color.blue;
	this.aColor = this.color.opacity;

	this.rbg = function () {
		return "rgba("+Math.round(this.rColor)+","+Math.round(this.gColor)+","+Math.round(this.bColor)+","+ (this.aColor) +")";
	}

	this.draw = () => {
		ctx.fillStyle = this.rbg(); //could be optimized
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.fill();
	};

	
	
	this.break = sodaCanvas.break
	this.animateSingle = sodaCanvas.animateSingle;
	this.animate = sodaCanvas.animate;
	//this.clicked = ()
	
};

function image(_x, _y, _width, _height, imageLink) {
	this.emptyPromise = (parameter) => new Promise((resolve, reject) => resolve()) 	
	this.currentlyAnimating = new Array();
	this.breakAnimation = new Array();
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.center = [this.width/2, this.height/2]; // not opdated when w / h is changed.. Should be done via get/set
	this.rotation; //unimplemented. //ctx.rotate(0.3) 
	this.imageFile = new Image();
	this.imageFile.src = imageLink;

	this.draw = () => {
		if(this.width === 0 && this.height === 0){ // if this were to be animated down to 0. it would draw differently.
			var widthToApply = this.width ? this.width : null;
			var heightToApply = this.height ? this.height : null; 
			ctx.drawImage(this.imageFile, this.x, this.y, widthToApply, heightToApply);
		}else{
			ctx.drawImage(this.imageFile, this.x, this.y);
		}
		
	};


	this.break = sodaCanvas.break
	this.animateSingle = sodaCanvas.animateSingle;
	this.animate = sodaCanvas.animate;
}