
// Setting Canvas
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, shootingImage, EnemyImage, gameoverImage;

let gameOver = false ; 
// if It's true gameOver, false no gameOver, 게임의 상태값. 게임 시작이면 false, 우주선이 바닥에 닿으면 true로 바뀌게해야함.


//Space ship XY
let spaceshipX = canvas.width/2-30;
let spaceshipY = canvas.height-60;

let score = 0;

let shootingList = []                           //Shooting save list
function Shooting(){
    this.x= 0; 
    this.y= 0;
    this.init=function (){                                                       //* init = initialize(초기화)
        this.x = spaceshipX + 22.5;
        this.y = spaceshipY; 
        this.alive = true; // if true = alive Bullet, false = gone(dead)
        shootingList.push(this);
    };
    this.update = function (){
        this.y -= 7;
    }; 

    this.checkHit=function (){

        // Bullet.y <= enemy.y  And
        // Bullet.x >= enemy.x and Bullet.x < enemy.x + enemy's width
        for(let i = 0; i< enemyList.length;i++){
            if(this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x && 
                this.x <= enemyList[i].x+64){

                score++;

                this.alive = false; //gone Bullet(Shooting)
                enemyList.splice(i, 1);
            };
        };
        
    };

};

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min // 0~1까지 Random한 넘버를 넣음
    return randomNum
}

let enemyList = []     // enamy save list
function Enemy(){
    this.x= 0;
    this.y= 0;
    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0, canvas.width-64);
        enemyList.push(this);
    };
    this.update=function() {
        this.y += 3;  // Enemy Speed
        
        if (this.y >=canvas.height-64) {
            gameOver = true;
            console.log("gameover")
        }
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
    EnemyImage.src="images/enemy.png";

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

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    }, 1000);
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

    for(let i=0;i<shootingList.length;i++){                                    
          //*i = item
        if (shootingList[i].alive) {
            shootingList[i].update();
            shootingList[i].checkHit();
        }
    }
    // Call Shooting's y-coordinate updated function

    for(let i =0; i<enemyList.length;i++){
        enemyList[i].update();
    }
    // Make Enemy Drop
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText('Score: ${score}', 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i=0; i < shootingList.length; i++){
        if(shootingList[i].alive){
            ctx.drawImage(shootingImage, shootingList[i].x, shootingList[i].y);
        }
    };
    
    for(let i=0; i < enemyList.length; i++){
        ctx.drawImage(EnemyImage, enemyList[i].x, enemyList[i].y);
    };
}

function main(){
    if(!gameOver) {
        update();                                               //update coordinates(좌표값)
        render();                                               //Draw coordinates
        requestAnimationFrame(main);
    }
    else{
        ctx.drawImage(gameoverImage, 10, 100, 380, 380);
    };
}

loadImage();
setupKeyboardListener();
createEnemy();
main();