//Getting elements

const canvas = document.getElementById("canvas"); //Get the canvas that i will draw the effect on
const ctx = canvas.getContext("2d"); //Define the context of the canvas, in this case, 2D
 
//Setting everything up

let cw = window.innerWidth; //Get the width of the viewport to draw elements on
let ch = window.innerHeight; //Get the height of the viewport to draw elements on
let max_count = 100; //The max chars that will be drawn on the viewport
let arrayFallChars = []; //The array that will hold every char that is on the viewport
let fontSize = 20; //Fontsize
let maxColumns = cw / fontSize; //The max columns of the screen, this formula i get from servetgulnaroglu, works very well
let frames = 0; //This holds the 'frames', its just a way to jump one step in every draw, using % 2 == 0;
let speed = 0.8; //The speed of the chars

canvas.width = cw; //Define canvas width using window width
canvas.height = ch; //Define canvas height using window height
 
//The chars that will be drawn on the viewport, you can add words too if you want, the effect is cool too

let chars = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", ]; 
 
//Class that holds speed, x, y from the char

class fallChar {

    //Constructor
    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

    //Draw function
    draw(ctx) {

        var char_index = Math.floor(Math.random() * chars.length); //Choose a random number
        this.value = chars[char_index]; //Hold the char
         
        this.speed = fontSize * speed; //Here we set speed based on fontSize

        ctx.fillStyle = "#10ed05"; //The color of the char
        ctx.font = fontSize + "px Lucida Console"; //The fontSize of the char
        ctx.fillText(this.value, this.x, this.y); //The color of the char
        this.y += this.speed; //Move the char in y axis based on speed set
            
        if(this.y > ch){
            
            this.x = Math.floor(Math.random() * maxColumns - 1) * fontSize;
            console.log(this.x);
            this.y = Math.random() * ch;
            this.speed = fontSize * speed;

        }

    }

} 

//Update the entire viewport every time

let update = () => {

    if (arrayFallChars.length < max_count) {

        let char = new fallChar(Math.floor(Math.random() * maxColumns) * fontSize, (Math.random() * ch) / 2 - 50); //Create a new char, fallChar(x, y)
        arrayFallChars.push(char); //Push the new char on the array of chars

    }

    //Draw a black background

    ctx.fillStyle = "rgba(0,0,0,0.08)"; //This will drawn the tail of the chars too, change the last value to change the size of the tail
    ctx.fillRect(0, 0, cw, ch); //Draw a rectangle using the width and height of the window, to use as background
    
    //Calls the draw function on fallChar class, here we see the use of the frames var, if we dont use, the chars will move a way more faster and the effect will be really messy

    for (let i = 0; i < arrayFallChars.length && frames % 2 == 0; i++) {

        arrayFallChars[i].draw(ctx);

    }

    requestAnimationFrame(update);
    frames++;

};

//Call the update 

update();