const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;
var chance = 3;
var gameState = "onSling";

function preload() {
    backgroundImg = loadImage("sprites/bg.jpg");
     getTime();
}

function setup(){
    createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    shoot = new Taehyung(200,50);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    aim1 = new Jungkook(810, 350);
    aim2 = new Jungkook(810, 220);

    log1 = new Log(810,260,300, PI/2);
    log2 =  new Log(810,180,300, PI/2);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    slingshot = new SlingShot(shoot.body,{x:200, y:50});  
}
function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    fill(200,150,150);
    textSize(20);
    text("SCORE: "+ score,1050,25);
    textSize(15);
    text("Press SPACE for another try. MAX TRIES:3",450,20);

    shoot.display();
    ground.display();
    platform.display();
    box1.display();
    box2.display();
    log1.display();
    box3.display();
    box4.display();
    aim1.display();
    aim1.score();
    aim2.display();
    aim2.score();
    log2.display();
    box5.display();
    log3.display();
    log4.display();
    slingshot.display(); 

    fill(0);
    textSize(18);
    text("Help Taehyung to get rid of Jungkook.",1,315);

    gameOver();
    
}
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(shoot.body, {x: mouseX , y: mouseY});
    }
}
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}
function keyPressed(){
    if(keyCode === 32){
       chance = chance-1;
       console.log(chance);
       Matter.Body.setPosition(shoot.body,{x:200,y:50});
       slingshot.attach(shoot.body);
       gameState = "onSling";
       shoot.trajectory = [];
       console.log(shoot.trajectory);
    }
}
async function getTime() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hours = datetime.slice(11,13);
    console.log(hours);
    if (hours>06 && hours<19) {
        backgroundImg = loadImage("sprites/bg.jpg");
    }
    else{
        backgroundImg = loadImage("sprites/bg2.jpg");
    }
}
function gameOver() {
    if(chance===0 || chance <0){
        gameState = "gameover";
        fill(200,150,150);
        textSize(40);
        text("GAMEOVER",480,150);
        Matter.Body.setPosition(shoot.body, {x: shoot.position.x , y: shoot.position.y});
    }  
    if(score == 150) {
        gameState = "win";
        fill(200,150,150);
        textSize(40);
        text("YOU DID IT !!",470,150);
        Matter.Body.setPosition(shoot.body, {x: shoot.position.x , y: shoot.position.y});
    }
}

