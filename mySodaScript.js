
setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
bg.center = [0,0]
var sodaRect = new rect(100, 100, 30, 30, "grey");

console.log('yo')

function draw(event){
	bg.draw();
	sodaRect.draw();
	sodaRect.x = event.clientX
}

$( document ).ready(() => {
	$( document ).click( () => {
		
		var x = event.clientX;
		var y = event.clientY;

		sodaRect.animate({
			x: x,
			y: y
		}, easing.easeOutExpo, 2000)
	})//.then(()=>loop())
})
