
// Setting Canvas
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, shootingImage, EnemyImage, gameoverImage;

//Space ship XY
let spaceshipX = canvas.width/2-30;
let spaceshipY = canvas.height-60;

let shootingList = []                           //Shooting save list
function Shooting(){
    this.x= 0; 
    this.y= 0;
    this.init=function(){                                                       //* init = initialize(초기화)
        this.x = spaceshipX + 22.5;
        this.y = spaceshipY; 

        shootingList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    }; 

}

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

let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        
        if(event.keyCode == 32){
            createShooting() // Start Shooting 
        }
    });
}

function createShooting(){
    console.log("Shooting");
    let b = new Shooting;  // create 1 shot of shooting
    b.init();
}

function update(){
    if (39 in keysDown){
        spaceshipX += 5; //spaceship speed
    } // right
    if (37 in keysDown){
        spaceshipX -=5; // left
    }

    if(spaceshipX <=0){
        spaceshipX=0;
    }
    if(spaceshipX >= canvas.width){
        spaceshipX = canvas.width-60;
    }
    // Makes spaceship moving in the canvcas

    for(let i=0;i<shootingList.length;i++){                                      //*i = item
        shootingList[i].update()
    }
    // Call Shooting's y-coordinate updated function
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    for(let i=0;i<shootingList.length;i++){
        ctx.drawImage(shootingImage,shootingList[i].x,shootingList[i].y);
    }
}

function main(){
    update();                                               //update coordinates(좌표값)
    render();                                               //Draw coordinates
    console.log("animation calls main function")
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();