// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 99;
    this.height = 66;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //call the reset method if the enemy get out of the canvas on the right side
    if(this.x > 500){
        this.reset();
    }
};

//reset the enemy position and add some speed to the enemy
Enemy.prototype.reset = function() {
    var position = [145,230,315];
    var yPosition = position[Math.floor(Math.random()*position.length)];
    this.x = 20;
    this.y = yPosition;
    this.speed += 5;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 460;
    this.speed = 20;
    this.width = 70;
    this.height = 76;
};

//updates the player position
Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
};

//draw the enemy on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this method allows the player to know his next direction based on an input
Player.prototype.handleInput = function(direction) {
    if(direction == 'up'){
       this.y += -(this.speed);
    }else if(direction == 'down'){
       this.y += this.speed;
    }else if(direction == 'right'){
       this.x += this.speed;
    }else if(direction == 'left'){
       this.x += -(this.speed);
    }

    if(direction == 'right' && this.x == 420){
        this.x -= (this.speed);
    }else if(direction == 'left' && this.x == -20){
        this.x -= -(this.speed);
    }else if(direction == 'down' && this.y > 460){
        this.y -= this.speed;
    }else if(direction == 'up' && this.y == -20){
        this.x = 200;
        this.y = 460;
    }
};

//allows the player to go back to his initial position
Player.prototype.reset = function() {
        this.x = 200;
        this.y = 460;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(20,145,60);
var enemy2 = new Enemy(20,230,30);
var enemy3 = new Enemy(20,315,20);

var allEnemies = [enemy1,enemy2,enemy3];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
