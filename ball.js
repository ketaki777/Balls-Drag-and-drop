var stage;
const balls = 3;
var storage = [];
var rightBalls = [
  { x: 400, y: 100, color: "purple", minx: 340, minY: 30, maxY: 170 },
  { x: 400, y: 250, color: "red", minx: 340, minY: 195, maxY: 300 },
  { x: 400, y: 400, color: "green", minx: 340, minY: 340, maxY: 480 },
];

var leftBalls = [
  { x: 100, y: 100, color: "red", correctIdx: 1 },
  { x: 100, y: 250, color: "green", correctIdx: 2 },
  { x: 100, y: 400, color: "purple", correctIdx: 0 },
];
var rect = mycanvas.getBoundingClientRect();

stage = new createjs.Stage("mycanvas");

function init() {
  drawL();
  drawR();
  mouseInteraction();
}

function drawL() {
  for (let i = 0; i < balls; i++) {
    let ball = new createjs.Shape();
    ball.correctIdx = leftBalls[i].correctIdx;
    ball.originalx = leftBalls[i].x;
    ball.originaly = leftBalls[i].y;

    ball.color = leftBalls[i].color;

    ball.graphics.beginFill(leftBalls[i].color).drawCircle(0, 0, 50);

    ball.x = leftBalls[i].x;

    ball.y = leftBalls[i].y;

    stage.addChild(ball);

    stage.update();

    storage.push(ball);
  }
}

function onup(e) {
  {
    // for(let i=0;i<storage.length;i++)

    if (
      e.target.x >= rightBalls[e.target.correctIdx].minx &&
      e.target.y <= rightBalls[e.target.correctIdx].maxY &&
      e.target.y > rightBalls[e.target.correctIdx].minY &&
      e.target.color == rightBalls[e.target.correctIdx].color
    ) {
      e.target.x = rightBalls[e.target.correctIdx].x;
      e.target.y = rightBalls[e.target.correctIdx].y;

      console.log("pressup");
    } else {
      e.target.x = e.target.originalx;
      e.target.y = e.target.originaly;
    }
  }
  stage.update();
}

function onpress(e) {
  e.target.x = e.stageX;

  e.target.y = e.stageY;

  stage.update();
}

function mouseInteraction() {
  for (let i = 0; i < storage.length; i++) {
    storage[i].addEventListener("pressmove", onpress);
    storage[i].addEventListener("pressup", onup);
  }
}

function drawR() {
  for (let i = 0; i < balls; i++) {
    let ball = new createjs.Shape();
    ball.graphics.beginStroke(rightBalls[i].color).drawCircle(0, 0, 60);
    ball.x = rightBalls[i].x;
    console.log(rightBalls[i].x);
    ball.y = rightBalls[i].y;
    stage.addChild(ball);
    stage.update();
  }
}
