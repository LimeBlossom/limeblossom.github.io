var mouseX = 0;
var mouseY = 0;

const canvas = document.getElementById("experiment");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var petalCount = ctx.canvas.width / 10 + ctx.canvas.height / 10;

var petals = [];
var treeTop = new Image();
treeTop.src = "TreeTop.png";

for (i = 0; i < petalCount; i++) {
    petal = { image: new Image(), x: 0, y: 0 };
    petal.image.src = "Petal.png";
    petal.x = 0;
    petal.y = 0;
    petal.xMult = 1 + Math.random() * 2;
    petal.yMult = 1 + Math.random() * 2;
    petals[i] = petal;
}
for (i = 0; i < petalCount; i++) {
    petals[i].x = Math.random() * ctx.canvas.width;
    petals[i].y = Math.random() * ctx.canvas.height;
}
petals[0].image.onload = animate;

function animate() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < petalCount; i++) {
        ctx.drawImage(petals[i].image, petals[i].x, petals[i].y, 12, 12);
        petals[i].x += 0.7 + Math.sin(Date.now() / 800) + Math.sin((Date.now() * petals[i].xMult) / 800);
        petals[i].y += ((Math.sin(Date.now()) + 0.7) / 3) * petals[i].yMult;
        //pushPetal(petals[i]);
        if (petals[i].x > ctx.canvas.width || petals[i].y > ctx.canvas.height) {
            petals[i].x = (Math.random() * ctx.canvas.width * 1.5) - (ctx.canvas.width * 0.5);
            petals[i].y = -10;
        }
    }

    ctx.drawImage(treeTop, 0, 0, 128, 128);

    requestAnimationFrame(animate)
}

function pushPetal(petal) {
    let pushThresh = 50;
    let dist = distance(petal.x, petal.y, mouseX, mouseY);
    if (dist < pushThresh) {
        let pushAmount = pushThresh * (1 - (dist / pushThresh));
        xDir = petal.x - mouseX;
        yDir = petal.y - mouseY;
        petal.x += (xDir / yDir) * pushAmount;
        petal.y += (yDir / xDir) * pushAmount;
    }
}

function distance(obj1x, obj1y, obj2x, obj2y) {
    let xDist = Math.abs(obj1x - obj2x);
    let yDist = Math.abs(obj1y - obj2y);
    return Math.sqrt(xDist * xDist + yDist * yDist);
}

function coordinate(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}