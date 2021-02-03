
var background1,parachute1,backgroundImage,parachute1Image,database;

function preload(){

  backgroundImage = loadImage("background.png");
  parachute1Image = loadImage("parachute.png");

}


function setup() {
  createCanvas(800,400);
  
 
  database = firebase.database();
  background1 = createSprite(400,200,800,400);
  background1.addImage(backgroundImage);
  parachute1 = createSprite(200,200,50,100);
  parachute1.addImage(parachute1Image);
 
  database.ref('parachute1/position').on("value",function(data){
      
    parachute1.x = data.val().x;
    parachute1.y = data.val().y;

  })
}


function draw() {
 
  if(parachute1.x>600){

    parachute1.x = 200;
    parachute1.y = 200;

  }

  
  
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
   parachute1.velocityY = -1;
    parachute1.scale = parachute1.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  parachute1.velocityY = 1;
    parachute1.scale = parachute1.scale+0.01;
    
}

  drawSprites();
  
}

function changePosition(x,y){
  parachute1.x = parachute1.x + x;
  parachute1.y = parachute1.y + y;
  database.ref('parachute1/position').update({
      
    x:parachute1.x,
    y:parachute1.y

  })
 
}
