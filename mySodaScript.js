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