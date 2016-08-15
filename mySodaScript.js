
setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1000, 700, "#EEEEEE");
bg.center = [0,0]
var sodaRect = new rect(100, 100, 30, 30, "grey");

console.log('yo')

function draw(){
	bg.draw();
	sodaRect.draw();
}

$( document ).ready(() => {
	$( document ).click( () => {
		var x = event.clientX;
		var y = event.clientY;
		sodaRect.break().then(() => {
			sodaRect.animate({
				x: Math.random() * 500, 
				y: Math.random() * 500, 
				width: 10+(Math.random() * 500),
				height: 10+(Math.random() * 500), 
			}, easing.easeInOutExpo, 1000)//.then(()=>loop())
		})
	})
})