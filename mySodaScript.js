
setInterval(() => draw(), (1000/frameRate))

var bg = new rect(0, 0, 1920, 1000, "white");
bg.center = [0,0];
var sodaRect = new rect(100, 100, 100, 100, 'black');

sodaRect.clicked(() => sodaRect.animate({width:0, height:0}, easing.easeOutExpo, 1000).then(() => sodaRect.animate({width:100, height:50}, easing.easeOutExpo, 1000)));
//sodaRect.mouseOver(() => console.log('mouseOver'))
//sodaRect.mouseAway(() => console.log('mouseAway'))
var sodaImg = new image(1920/2 - 276/2, 500-276/2 - 5, 200, 200, "logosmall.png");
var sodaRects = new Array()


for (var i = 0; i < 100; i++) {
	sodaRects[i] = new rect(20*i, 0, 100, 1000, "white")
}

function draw(event){
	bg.draw();

	for (var i = 0; i < 100; i++) {
		sodaRects[i].draw();
	}
	sodaRect.draw();
	
}


//$( document ).ready(() => {
//sodaRect.clicked((mouseEvent) => console.log(mouseEvent))
$( document ).click( () => {
	//sodaRect.animate({aColor: 0}, easing.easeInOutExpo, 1000).then(() => sodaRect.animate({aColor:0.6}, easing.easeInOutExpo, 1000))
})

loop();
function loop(){

	for (var i = 0; i < 100; i++) {
		sodaRects[i].animate({
			width:2,
		}, easing.easeInOutExpo, 1000)
	}

	setTimeout(function() {
	for (var i = 0; i < 100; i++) {
		sodaRects[i].animate({
			rColor: Math.random() * 256*2 + 100,
			bColor: Math.random() * 0 + 100,
			gColor: Math.random() * 256/3 + 100,
			height: Math.random() * 500 + 250,
		}, easing.easeInOutExpo, 1000)
	}
	}, 1000);

	setTimeout(() => {
		c.style.cursor = ''
		for (var i = 0; i < 100; i++) {
			sodaRects[i].animate({
				width:0
			}, easing.easeInOutExpo, 1000)
		}
	}, 2000)
	setTimeout(() => loop(), 3000);
}

$( document ).ready(() => {
	$( document ).click( () => {
		
		sodaRect.animate({
			rColor: Math.random()*256,
			bColor: Math.random()*256,
			gColor: Math.random()*256,
		}, easing.easeOutExpo, 2000)

		var x = event.clientX - offset.x;
		var y = event.clientY - offset.y;

		sodaRect.animate({
			width:100,
			height:100,
			x: x,
			y: y,
		}, easing.easeInExpo, 1000)
		.then(() => sodaRect.animate({
			width:50,
			height:50,
		}, easing.easeInQuad, 1000) )
	})
})


