
// Setting Canvas
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, shootingImage, EnemyImage, gameoverImage;
//Space ship XY
let spaceshipX = canvas.width/2-30
let spaceshipY = canvas.height-60

function loadImage () {
    backgroundImage = new Image();
    backgroundImage.src="images/background.gif";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    shootingImage = new Image();
    shootingImage.src="images/shooting.png";

    EnemyImage = new Image();
    EnemyImage.src="images/Enemy.png";

    gameoverImage= new Image();
    gameoverImage.src="images/gameover.png";
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
}

function main(){
    render()
    console.log("animation calls main function")
    requestAnimationFrame(main)
}

loadImage();
main();