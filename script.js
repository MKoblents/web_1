const canvas = document.getElementById('coordinate-plane');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX= width/2;
const centerY= height/2;
const R = 2;
const scale = 100;


function toCanvasX(x){
    return centerX + x*scale;
}

function toCanvasY(y){
    return centerY - y*scale;
}

ctx.fillStyle='rgba(52,152,219,0.7)';
ctx.fillRect(
    toCanvasX(-R),
    toCanvasY(R),
    R*scale,
    R*scale
);

ctx.beginPath();
ctx.moveTo(toCanvasX(0), toCanvasY(0));
ctx.lineTo(toCanvasX(R/2), toCanvasY(0));
ctx.lineTo(toCanvasX(0), toCanvasY(R/2));
ctx.closePath();
ctx.fillStyle='rgba(52,152,219,0.7)';
ctx.fill();

ctx.beginPath();
ctx.moveTo(toCanvasX(0), toCanvasY(0));
ctx.lineTo(toCanvasX(R/2), toCanvasY(0));
ctx.arc(
    toCanvasX(0),
    toCanvasY(0),
    (R/2)*scale,
    0,
    Math.PI/2,
    false
)
ctx.closePath();
ctx.fillStyle='rgba(52,152,219,0.7)';
ctx.fill();

ctx.beginPath();
ctx.moveTo(0, centerY);
ctx.lineTo(width, centerY);
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, height);
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(width - 10, centerY - 5);
ctx.lineTo(width, centerY);
ctx.lineTo(width - 10, centerY + 5);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(centerX - 5, 10);
ctx.lineTo(centerX, 0);
ctx.lineTo(centerX + 5, 10);
ctx.stroke();

ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('X', width - 20, centerY - 10);
ctx.fillText('Y', centerX -20, 20);
const xMarks = [-R, -R/2, R/2, R];
ctx.font = '20px Arial';
ctx.textAlign = 'center';

xMarks.forEach(function(x) {
    const canvasX = toCanvasX(x);
    ctx.beginPath();
    ctx.moveTo(canvasX, centerY - 5);
    ctx.lineTo(canvasX, centerY + 5);
    ctx.stroke();

    let label = x;
    if (x === -R) label = '-R';
    else if (x === -R / 2) label = '-R/2';
    else if (x === R) label = 'R';
    else label = 'R/2';

    ctx.fillText(label, canvasX, centerY + 20);
});
const yMarks = [-R, -R/2, R/2, R];
ctx.textAlign = 'right';

yMarks.forEach(function(y) {
    const canvasY = toCanvasY(y);

    ctx.beginPath();
    ctx.moveTo(centerX - 5, canvasY);
    ctx.lineTo(centerX + 5, canvasY);
    ctx.stroke();

    let label = y;
    if (y === -R) label = '-R';
    else if (y === -R/2) label = '-R/2';
    else if (y === R/2) label = 'R/2';
    else if (y === R) label = 'R';

    ctx.fillText(label, centerX - 10, canvasY + 5);
});