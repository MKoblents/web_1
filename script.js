const canvas = document.getElementById('coordinate-plane');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX= width/2;
const centerY= height/2;

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