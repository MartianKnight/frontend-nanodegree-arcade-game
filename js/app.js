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
    this.x = 120;
    this.y = 200;
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
    this.sprite = 'images/char-boy.png'
    this.x = 200;
    this.y = 400;

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

    var move = 15 * 6;

    if (keys == "left") {
      this.x = this.x - move;
    }
    else if (keys == "right") {
      this.x = this.x + move;
    }
    else if (keys == "up") {
      this.y = this.y - move;
    }
    else if (keys == "down") {
      this.y = this.y + move;
    }
    console.log("After " + this.x + "  " + this.y);
};

// Now instantiate your objects.
var enemy01 = new Enemy();
enemy01.x = 10;
enemy01.y = 215;

var enemy02 = new Enemy();
enemy02.x = -250;
enemy02.y = 135;

var enemy03 = new Enemy();
enemy03.x = -100;
enemy03.y = 55;

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
