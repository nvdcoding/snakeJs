const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const HEIGHT = 608;
const WIDTH = 608;
const box = 32;
canvas.height = HEIGHT;
canvas.width = WIDTH;
let imgFood = new Image();
imgFood.src = "	images/bamboo.png";
let ground = new Image();
ground.src = "images/ground.jpg";
let pandaHead = new Image();
pandaHead.src = "images/panda.png";
let pandaBody = new Image();
pandaBody.src = "images/circle.png";
// audio
let moveSound = new Audio();
moveSound.src = "audio/move.mp3";
let eatSound = new Audio();
eatSound.src = "audio/eat.mp3";
let endSound = new Audio();
endSound.src = "audio/end.mp3";
// score
let score = 0;
// snake
let panda = new Array();
panda[0] = {
	x: 9*box,
	y: 10*box
}
// cosilion
function selfBite(newHead){
	for(let i=0;i<panda.length;i++){
		if(newHead.x == panda[i].x && newHead.y == panda[i].y){
			return true;
		}
	}
	return false;
}
let direc;
document.addEventListener('keydown',function direction(event){
	let key = event.keyCode;
	if (key == 39 && direc != "left"){
		moveSound.play();
		direc = "right";
	} else if (key == 38 && direc != "down") {
		moveSound.play();
		direc = "up";
	} else if (key == 37 && direc != "right"){
		moveSound.play();
		direc = "left";
	} else if (key == 40 && direc != "up") {
		moveSound.play();
		direc = "down";
	}
}, false);
// dino[1] = {
// 	x: 10*box,
// 	y: 10*box
// }
// food
let food = {
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
}
function draw(){
	context.drawImage(ground,0,0);
	for(let i = 0;i<panda.length;i++){
		//  dino
		if(i==0){
			context.drawImage(pandaHead,panda[0].x,panda[0].y);
		} else {
			context.drawImage(pandaBody,panda[i].x,panda[i].y);
		}
	}
	// Food
		context.drawImage(imgFood,food.x,food.y);
	// head position
	let headX = panda[0].x;
	let headY = panda[0].y;
	// check direction
	if( direc == "right"){
		headX += box;
	}
	if(direc == "left"){
		headX -= box;
	}
	if(direc == "up"){
		headY -= box;
	}
	if(direc == "down"){
		headY+=box;
	}
	// if dino eat food
	if (headX == food.x && headY == food.y){
		score++;
		food.x = Math.floor(Math.random()*17+1)*box;
		food.y = Math.floor(Math.random()*15+3)*box;
		eatSound.play();
	} else {
		panda.pop();
	}
	let newHead = {
		x: headX,
		y: headY
	}
	//exceed(headX,headY);
	//selfBite(headX,headY);
	// check game over
	if(headX < box || headX >17*box || headY < 3*box || headY > 17*box || selfBite(newHead)){
		clearInterval(loop);
		endSound.play();
		context.fillStyle = "red";
    	context.font = "40px Changa one";
    	context.fillText(`Game Over, your score: ${score}`,3*box,10*box);
	}
	
	panda.unshift(newHead);
	context.fillStyle = "black";
    context.font = "40px Changa one";
    context.fillText(score,5*box,1.6*box);


}
let loop = setInterval(draw,150);