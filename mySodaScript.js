
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
	loop()
	$( document ).click( () => {
		
		var x = event.clientX;
		var y = event.clientY;

		sodaRect.animate({
			x: x,
		}, easing.easeInOutExpo, 2000)
	})//.then(()=>loop())
})

function loop(){
	if(sodaRect.y < 300){
		sodaRect.animate({
			y: 500,
		}, easing.easeInOutExpo, 1000).then(() => loop())
	}else{
		sodaRect.animate({
			y: 0,
		}, easing.easeInOutExpo, 1000).then(() => loop())
	}
}