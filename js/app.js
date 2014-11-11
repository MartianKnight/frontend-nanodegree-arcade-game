//Make a super class?
/*
var Sprites = function() {
    var this.sprite;
    var this.x;
    var this.y;
};
*/

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Randomly place bug on the three column lanes
    var ranNumLaneY = Math.floor(Math.random() * 4);
    console.log(ranNumLaneY);
    this.y = 55 + (80 * (ranNumLaneY - 1));

    // Randomly start bug on the row
    var ranNumLaneX = Math.floor(Math.random() * 201) + 100;
    console.log(ranNumLaneX);
    var negLaneStartX = Math.abs(ranNumLaneX) * -1;
    this.x = negLaneStartX;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Change x to a random negative number -300 to -40
    if (this.x < 500) {
      this.x = (this.x + 2);
    }
    else {
      this.x = -50;
    }
    //Render is done in Engine.js
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
    this.x = 205;
    this.y = 400;
    this.moveX = 101;
    this.moveY = 85;

};

//player.prototype = Object.create(Enemy.prototype);
//player.prototype.constructor = player;

Player.prototype.update = function() {
    //
    //this.x = this.x + 5;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    //logic for each key type and render the movement
    console.log(keys);
    console.log("Before" + this.x + "  " + this.y);

    // Change the amount of move

    if (keys == "left") {
      this.x = this.x - this.moveX;
    }
    else if (keys == "right") {
      this.x = this.x + this.moveX;
    }
    else if (keys == "up") {
      this.y = this.y - this.moveY;
    }
    else if (keys == "down") {
      this.y = this.y + this.moveY;
    }
    else {
      console.log("Incorrect Movement Key");
    }
    console.log("After " + this.x + "  " + this.y);
};

// Now instantiate your objects.

var enemy01 = new Enemy();
var enemy02 = new Enemy();
var enemy03 = new Enemy();


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy01, enemy02, enemy03];
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
