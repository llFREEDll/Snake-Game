const canvas =document.getElementById('canvas');
const context = canvas.getContext('2d');
var style = canvas.style;
//style.marginLeft = "auto";
//style.marginRight = "auto";
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
//parentStyle.width = "100%";

var move=true;
const dx=25;
let snake=[];
let score=0;
let dir=" ";

const bg=new Image();
bg.src="bg.png";
const foodI=new Image();
foodI.src="food.png";
const sHead=new Image();
sHead.src="sHead.png";
const sBody=new Image();
sBody.src="sBody.png";
snake[0]={x:25,y:75}

let food={
    x:Math.floor((Math.random()*14)+1)*dx,
    y:Math.floor((Math.random()*13)+2)*dx
}

var direction = function(event){
    if(event.keyCode == 37 && dir != "R" && move){
        dir="L";
        move=false;
    }
    else if(event.keyCode==38&&dir!="D"&&move){
        dir="U";
        move=false;
    }
    else if(event.keyCode==39&&dir!="L"&&move){
        dir="R";
        move=false;
    }
    else if(event.keyCode==40&&dir!="U"&&move){
        dir="D";
        move=false;
    }

}

 var collision=function(head,array){
    for(let i=0;i<array.length;i++)
    if(head.x==array[i].x&&head.y==array[i].y){
        return true;
    }
        return false;
}
document.addEventListener("keydown",direction);

var draw=function(){
    context.drawImage(bg,0,0);
    move=true;
        let snakeX=snake[0].x;
        let snakeY=snake[0].y;

        if(dir=="L") snakeX-= dx;
        if(dir=="U") snakeY-= dx;
        if(dir=="D") snakeY+= dx;
        if(dir=="R") snakeX+= dx;



    for(let i=0;i<snake.length;i++){
        i==0?context.drawImage(sHead,snake[i].x,snake[i].y):context.drawImage(sBody,snake[i].x,snake[i].y);
    }

        context.drawImage(foodI,food.x,food.y);
        for(let i=0;i<snake.length;i++){
            if(snake[i].x==food.x&&snake[i].y==food.y)
            food={
                x:Math.floor((Math.random()*14)+1)*dx,
                y:Math.floor((Math.random()*13)+2)*dx
            }
        }

        if(snakeX==food.x&&snakeY==food.y){
            if(score<182){
                score++;
            for(let i=0;i<snake.length;i++){
                if(snake[i].x==food.x&&snake[i].y==food.y)
                food={
                    x:Math.floor((Math.random()*14)+1)*dx,
                    y:Math.floor((Math.random()*13)+2)*dx
                }          }
        }
            else{
                alert("CONGRATULATION!!! \n YOU WIN!");
            }

        }else snake.pop();

        context.fillStyle="white";
        context.font="45px Consolas"
        context.fillText("Score:"+score,100,40);
        let newHead={
            x:snakeX,
            y:snakeY
        }



        if(snakeX<=0||snakeX>=375||snakeY<=25||snakeY>=375||collision(newHead,snake)){
            clearInterval(loop);
            context.drawImage(bg,0,0);
            context.fillStyle="white";
            context.font="45px Consolas"
            context.fillText("YOU LOSE!",100,40);
            if(collision(newHead,snake))
            for(let i=0;i<snake.length;i++)
                    i==0?context.drawImage(sHead,snake[i].x,snake[i].y):context.drawImage(sBody,snake[i].x,snake[i].y);
            snake.unshift(newHead);
            if(snakeX>=375)
            for(let i=0;i<snake.length;i++)
                i==0?context.drawImage(sHead,snake[i].x-dx,snake[i].y):context.drawImage(sBody,snake[i].x-dx,snake[i].y);
            else if(snakeX<=25)
            for(let i=0;i<snake.length;i++)
                i==0?context.drawImage(sHead,snake[i].x+dx,snake[i].y):context.drawImage(sBody,snake[i].x+dx,snake[i].y);
            else if(snakeY>=375)
            for(let i=0;i<snake.length;i++)
                i==0?context.drawImage(sHead,snake[i].x,snake[i].y-dx):context.drawImage(sBody,snake[i].x,snake[i].y-dx);
            else if(snakeY<=25)
                for(let i=0;i<snake.length;i++)
                    i==0?context.drawImage(sHead,snake[i].x,snake[i].y+dx):context.drawImage(sBody,snake[i].x,snake[i].y+dx);
        }
        snake.unshift(newHead);

        }
var restart=function(){
     snake.length=0;
     score=0;
     snake[0]={x:25,y:75}
     dir=" ";

    food={
    x:Math.floor((Math.random()*14)+1)*dx,
    y:Math.floor((Math.random()*13)+2)*dx
    }
    clearInterval(loop);
    loop=setInterval(draw,150);
}

let loop=setInterval(draw,150);
