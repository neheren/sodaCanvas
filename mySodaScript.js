
setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
bg.center = [0,0]
var sodaRect = new rect(100, 100, 30, 30, "grey");

function draw(event){
	bg.draw();
	sodaRect.draw();
}

$( document ).ready(() => {
	$( document ).click( () => {
		
		sodaRect.animate({
			rColor: Math.random()*256,
			bColor: Math.random()*256,
			gColor: Math.random()*256,
		}, easing.easeOutExpo, 2000)

		var x = event.clientX;
		var y = event.clientY;

		sodaRect.animate({
			width:100,
			height:100,
			x: x,
			y: y,
		}, easing.easeInExpo, 1000)
		.then(() => sodaRect.animate({
			width:50,
			height:50,
		}, easing.easeInQuad, 500) )
	})//.then(()=>loop())
})
