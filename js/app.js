//  X X X X
//Y
//Y   THE DRAW AREA
//Y

// TODO: Add Score

var Counters = function() {
  this.score = 0;
};

// TODO: Splash screen
// TODO: player select
// TODO: Fix magic numbers
// TODO: Death screen

// TODO: Hearts/Lives function
var Lives = function() {
  this.sprite = 'images/Heart.png';
  this.lives = 3;

  function died() {
    this.lives--;
    console.log("You died in the function");
  }

};

// TODO: increase difficulty over time


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    console.log(this.width);
    //this.height = Resources.get(this.sprite).height;
    this.x = x;
    this.y = y;

    this.collisionBox = 70;
    this.minX = 40;
    this.maxX = 300;

    // Randomly place bug on the three column lanes
    //var ranNumLaneY = Math.floor(Math.random() * 4);
    //console.log(ranNumLaneY);
    // this.y = 70 + (80 * (ranNumLaneY - 1));
    // console.log("Current y = " + this.y)
    // // Randomly start bug on the row
    // var ranNumLaneX = Math.floor(Math.random() * 201) + 100;
    // //console.log(ranNumLaneX);
    // var negLaneStartX = Math.abs(ranNumLaneX) * -1;
    // this.x = negLaneStartX;

    // Add enemy speed

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Add enemy speed

    // Change x to a random negative number -300 to -40
    if (this.x < 500) {
      this.x = (this.x + 2);
    }
    else {
      var ranNum = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX;
      var negLaneStartX = Math.abs(ranNum) * -1;
      this.x = negLaneStartX;
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
    this.spriteHearts = 'images/Heart.png';

    this.xHearts = 350;
    this.yHearts = 400;

    this.lives = 3;
    this.score = 0;

    this.moveX = 101;
    this.moveY = 85;

    this.startx = 202;
    this.starty = 400;

    this.x = this.startx;
    this.y = this.starty;

    //this.width = Resources.get(this.sprite).width;
    //this.height = Resources.get(this.sprite).height;

};

//player.prototype = Object.create(Enemy.prototype);
//player.prototype.constructor = player;

Player.prototype.update = function() {

    allEnemies.forEach(function(enemy) {

      if (enemy.y == player.y) {
        if (enemy.x <= (player.x + enemy.collisionBox) && enemy.x >= (player.x - enemy.collisionBox) ) {
          player.x = player.startx;
          player.y = player.starty;
          player.lives--;
          console.log("You Died: " + player.lives);
        }
      }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    for (var i = 0; i < player.lives; i++) {
      //console.log(player.lives);
      ctx.drawImage(Resources.get(this.spriteHearts), this.xHearts + (20 * i), this.yHearts);
    }
};

Player.prototype.handleInput = function(keys) {
    //logic for each key type and render the movement
    //console.log(keys);

    // TODO: Remove magic numbers
    function validMoveX(move) {
      var newX = move;
      if (newX < 50) {
        return 0;
      }
      else if (newX > 500) {
        return 404;
      }
      else {
        return newX;
      }
    }

    // TODO: Remove magic numbers
    function validMoveY(move) {
      var newY = move;
      if (newY < 50) {
        player.score++;
        console.log("You Win : " + player.score);
        return 400;
      }
      else if (newY > 450) {
        return 400;
      }
      else {
        return newY;
      }
    }

    // Handle the inputs and check if they are valid moves
    if (keys == "left") {
      this.x = validMoveX(this.x - this.moveX);
    }
    else if (keys == "right") {
      this.x = validMoveX(this.x + this.moveX);
    }
    else if (keys == "up") {
      this.y = validMoveY(this.y - this.moveY);
    }
    else if (keys == "down") {
      this.y = validMoveY(this.y + this.moveY);
    }
    else {
      console.log("No Move or Incorrect Key");
    }

    console.log("After: X= " + this.x + ", Y= " + this.y);
};

// Now instantiate your objects.

// Add two more enemies
var enemy01 = new Enemy(-10, 230);
var enemy02 = new Enemy(-10, 145);
var enemy03 = new Enemy(-10, 60);

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy01, enemy02, enemy03];
var player = new Player();

var lives = new Lives();

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
