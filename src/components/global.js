/** Глобальные объекты для стейтлифтинга */
global.gamer = initMatrix(global.gamer);
global.pc = initMatrix(global.pc);


function Field() {
  this.shipsData	= [
    '',
    [4, 'fourdeck'],
    [3, 'tripledeck'],
    [2, 'doubledeck'],
    [1, 'singledeck']
  ];

  this.squadron	= [];
}

Field.prototype.randomLocationShips = function() {
  this.matrix = initMatrix();

  for (var i = 1, length = this.shipsData.length; i < length; i++) {
    var decks = this.shipsData[i][0];
    for (var j = 0; j < i; j++) {

      var fc = this.getCoordinatesDecks(decks);
      fc.decks 	= decks;
      fc.shipname	= this.shipsData[i][1] + String(j + 1);

      var ship = new Ships(this, fc);
        ship.createShip();
    }
  }

}

Field.prototype.getCoordinatesDecks = function(decks) {
  var kx = getRandom(1),
    ky = (kx == 0) ? 1 : 0,
    x, y;
  
  if (kx == 0) {
    x = getRandom(9);
    y = getRandom(10 - decks);
  } else {
    x = getRandom(10 - decks);
    y = getRandom(9);
  }
  
  var result = this.checkLocationShip(x, y, kx, ky, decks);
  if (!result) return this.getCoordinatesDecks(decks);

  var obj = {
    x: x,
    y: y,
    kx: kx,
    ky: ky
  };
  return obj;
}

Field.prototype.checkLocationShip = function(x, y, kx, ky, decks) {
  var fromX, toX, fromY, toY;

  fromX = (x == 0) ? x : x - 1;

  if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;
  else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;
  else if (x == 9 && kx == 0) toX = x + 1;
  else if (x < 9 && kx == 0) toX = x + 2;

  fromY = (y == 0) ? y : y - 1;
  if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
  else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
  else if (y == 9 && ky == 0) toY = y + 1;
  else if (y < 9 && ky == 0) toY = y + 2;

  if (toX === undefined || toY === undefined) return false;

  for (var i = fromX; i < toX; i++) {
    for (var j = fromY; j < toY; j++) {
      if (this.matrix[i][j] == 1) return false;
    }
  }
  return true;
}

function Ships(player, fc) {
  this.player 	= player;
  this.decks		= fc.decks;
  this.x0			= fc.x;
  this.y0			= fc.y;
  this.kx			= fc.kx;
  this.ky 		= fc.ky;
  this.matrix		= [];
}

Ships.prototype.createShip = function() {
  var k		= 0,
    x		= this.x0,
    y		= this.y0,
    kx		= this.kx,
    ky		= this.ky,
    decks	= this.decks,
    player	= this.player

  while (k < decks) {
    player.matrix[x + k * kx][y + k * ky] = 1;
    this.matrix.push([x + k * kx, y + k * ky]);
    k++;
  }
  
}

var human = new Field();
var computer = new Field()

computer.randomLocationShips();
human.randomLocationShips();

global.gamer = human.matrix; 
global.pc = computer.matrix;

function initMatrix(arr) {
  arr = [];
  for( let i = 0; i < 10; i++) {
    arr[i] = Array(10).fill(0); 
  }

  return arr;
};

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

