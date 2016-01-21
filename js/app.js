'use strict';

var gameState = 'void',
    count = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //if the player collide with an enemy reset is position
    if (checkCollision(player, this)) {
        player.reset();
    }

    //call the reset method if the enemy get out of 
    //the canvas on the right side and add 1 to count
    if (this.x > 500) {
        count += 1;
        this.reset();
    }
};

//reset the enemy position and add some speed to the enemy
Enemy.prototype.reset = function() {
    var position = [145, 230, 315];
    var yPosition = position[Math.floor(Math.random() * position.length)];
    this.x = 20;
    this.y = yPosition;
    this.speed += 5;
    //create a random enemy after enemie reset method as been called 5 times
    if (count === 5) {
        createRandomEnemies();
    }
};

//remove/kill two enemy from the array
//reduce the speed of the remaining enemies
//and boost the player speed
var dieAndSlowEnemy = function() {
    allEnemies.splice(3, 2);
    allEnemies.forEach(function(enemy) {
        enemy.speed -= 10;
    });
    player.speed += 10;
};

//create random enemies
var createRandomEnemies = function() {
    var yArray = [145, 230, 315];
    var yDirection = yArray[Math.floor(Math.random() * yArray.length)];
    var speed = 20 + 20 * Math.floor(Math.random() * 4);
    allEnemies.push(new Enemy(20, yDirection, speed));
    count = 0;

    if (allEnemies.length === 10) {
        gameState = 'game-over';
        items = ['#milk', '#vinegar', '#baking-soda', '#salt', '#flour', '#egg', '#sugar', '#baking-powder', '#butter', '#cooking-spray', '#step1', '#step2', '#step3'];
    } else if (allEnemies.length >= 5 && allCollectables.length == 2) {
        //if there are more that 5 enemies and the slowingGem
        //is not included in the allCollectables array
        //add it to the allCollectables array so it can now be 
        //rendered and updated
        allCollectables.push(slowingGem);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//rock class
var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.width = 20;
    this.height = 20;
};

// Update the rock's position
Rock.prototype.update = function(dt, player) {
    this.y += this.speed * dt;

    //if the player collide with a rock reset it's positon
    if (checkCollision(player, this)) {
        player.reset();
    }
};

// Draw the rock on the screen
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//collectable class
var Collectable = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.width = 50;
    this.height = -10;
};

//update the collectable position
Collectable.prototype.update = function(dt, player) {
    this.y += this.speed * dt;

    if (checkCollision(player, this)) {
        if (this === slowingGem) {
            //if the collecable is the slowingGem
            //remove if from the allCollectables array
            //reset the player position and call dieAndSlowEnemy()
            allCollectables.pop();
            player.reset();
            dieAndSlowEnemy();
        } else {
            //reset the player position and call OnCollection
            player.reset();
            OnCollection();
        }
    }
};

//Draw the collectable on the screen
Collectable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 460;
    this.speed = 40;
    this.width = 70;
    this.height = 76;
};

//draw the enemy on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this method allows the player to know his next direction based on an input
Player.prototype.handleInput = function(direction) {
    if (direction == 'up') {
        this.y += -(this.speed);
    } else if (direction == 'down') {
        this.y += this.speed;
    } else if (direction == 'right') {
        this.x += this.speed;
    } else if (direction == 'left') {
        this.x += -(this.speed);
    }

    if (direction == 'right' && this.x >= 420) {
        this.x = 410;
    } else if (direction == 'left' && this.x <= -20) {
        this.x = -10;
    } else if (direction == 'down' && this.y > 460) {
        this.y -= this.speed;
    } else if (direction == 'up' && this.y === -20) {
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
var enemy1 = new Enemy(20, 145, 60);
var enemy2 = new Enemy(20, 230, 30);
var enemy3 = new Enemy(20, 315, 20);

var allEnemies = [enemy1, enemy2, enemy3];

//instantiate the Rocks
var rock1 = new Rock(1, 60);
var rock2 = new Rock(204, 60);
var rock3 = new Rock(404, 60);

var allRocks = [rock1, rock2, rock3];

//instantiate the collectables
var star1 = new Collectable(105, 70, 'images/Star.png');
var star2 = new Collectable(305, 70, 'images/Star.png');
var slowingGem = new Collectable(404, 128, 'images/Selector.png');

var allCollectables = [star1, star2];

// Place the player object in a variable called player
var player = new Player();

//check the collision between two rectangles
var checkCollision = function(rect1, rect2) {
    if (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y) {
        return true;
    } else {
        return false;
    }
};

var gameReset = function() {
    if (allCollectables.length === 3) {
        allCollectables.pop();
    }
    player.speed = 40;
    allEnemies = [];
    enemy1 = new Enemy(20, 145, 80);
    enemy2 = new Enemy(20, 230, 30);
    enemy3 = new Enemy(20, 315, 20);
    allEnemies = [enemy1, enemy2, enemy3];
    $('.list li').css('display', 'none');
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (gameState === 'void' && allowedKeys[e.keyCode] === 'space') {
        gameState = 'game';
        player.reset();
    } else if (gameState === 'game-over' && allowedKeys[e.keyCode] === 'space') {
        gameState = 'game';
        gameReset();
        player.reset();
    }

    player.handleInput(allowedKeys[e.keyCode]);
});