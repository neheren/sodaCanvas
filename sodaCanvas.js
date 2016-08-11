var c = document.getElementById("sodaCanvas");
var ctx = c.getContext("2d");

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

	this.animate = (parameter, position) => {
		this[parameter] = position
	};
};

setInterval(() => draw(), (1000/50))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
var sodaRect = new rect(100, 100, 100, 100, "red");


function draw(){	
	bg.draw();
	sodaRect.draw();
}

$( document ).ready(()=>{
	$( document ).click( () => {
		console.log('test')
	})
})


