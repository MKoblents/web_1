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
function numberRelativeToR(n, r){
    return n*R/r;
}
function toCanvasY(y){
    return centerY - y*scale;
}
function drawCanvas(R){
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
}
drawCanvas(R);
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

const y = document.getElementById('y-input').value;
const selectedX = document.querySelector('input[name="x"]:checked');
if (selectedX) {
    const xValue = selectedX.value;
    console.log(xValue);
}

const form = document.getElementById('point-form');

form.addEventListener('submit', function (event){
    event.preventDefault();
    clearErrors();
    const x = getSelectedRadioValue('x');
    const y = document.getElementById('y-input').value.trim();
    const r = getSelectedRadioValue('r');

    let isValid = true;

    if (x ===null){
        showError('x-error', "Выберите значение Х" );
        isValid = false;
    }
    if (y === '') {
        showError('y-error', 'Введите значение Y');
        isValid = false;
    } else if (isNaN(parseFloat(y))) {
        showError('y-error', 'Y должен быть числом');
        isValid = false;
    } else {
        const yNum = parseFloat(y);
        if (yNum < -3 || yNum > 5) {
            showError('y-error', 'Y должен быть от -3 до 5');
            isValid = false;
        }
    }

    if (r === null) {
        showError('r-error', 'Выберите значение R');
        isValid = false;
    }

    if (isValid){
        const xNum = parseFloat(x);
        const yNum = parseFloat(y);
        const rNum = parseFloat(r);

        const isHit = checkHit(xNum, yNum, rNum);
        // redrawCanvas(rNum);

        drawPoint(xNum, yNum, rNum, isHit);
        addResultToTable(xNum, yNum, rNum, isHit);
    }
});
function checkHit(x, y, R) {
    const inSquare = (x >= -R && x <= 0) && (y >= 0 && y <= R);
    const inCircle = (x >= 0 && y <= 0) && (x * x + y * y <= (R / 2) * (R / 2));
    const inTriangle = (x>=0 && y>=0) && (y<=-x +R/2);
    return inSquare || inCircle || inTriangle;
}

function getSelectedRadioValue(name){
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if (selected){
        return selected.value;
    }
    return null;
}

function showError(elementId, message){
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors(){
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(element){
        element.textContent='';
    });
}

function drawPoint(x, y, R, isHit) {
    const canvasX = toCanvasX(numberRelativeToR(x, R));
    const canvasY = toCanvasY(numberRelativeToR(y,R));

    ctx.fillStyle = isHit ? '#27ae60' : '#e74c3c';

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}
function redrawCanvas(R) {
    ctx.clearRect(0, 0, width, height);

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

    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('X', width - 20, centerY - 10);
    ctx.fillText('Y', centerX + 10, 20);

    const scale = (width / 2) / R;

    const xMarks = [-R, -R/2, R/2, R];
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';

    xMarks.forEach(function(x) {
        const canvasX = centerX + x * scale;

        ctx.beginPath();
        ctx.moveTo(canvasX, centerY - 5);
        ctx.lineTo(canvasX, centerY + 5);
        ctx.stroke();

        let label = x;
        if (x === -R) label = '-R';
        else if (x === -R/2) label = '-R/2';
        else if (x === R/2) label = 'R/2';
        else if (x === R) label = 'R';

        ctx.fillText(label, canvasX, centerY + 20);
    });

    const yMarks = [-R, -R/2, R/2, R];
    ctx.textAlign = 'right';

    yMarks.forEach(function(y) {
        const canvasY = centerY - y * scale;

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

    ctx.fillStyle = 'rgba(52, 152, 219, 0.7)';
    ctx.fillRect(
        centerX + (-R) * scale,
        centerY - R * scale,
        R * scale,
        R * scale
    );

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + (R/2) * scale, centerY);
    ctx.arc(centerX, centerY, (R / 2) * scale, 0, Math.PI / 2, false);
    ctx.closePath();
    ctx.fillStyle = 'rgba(52, 152, 219, 0.7)';
    ctx.fill();
}
function addResultToTable(x, y, R, isHit) {
    const tbody = document.getElementById('results-body');
    const row = document.createElement('tr');
    const cellX = document.createElement('td');
    cellX.textContent = x;

    const cellY = document.createElement('td');
    cellY.textContent = y;

    const cellR = document.createElement('td');
    cellR.textContent = R;

    const cellResult = document.createElement('td');
    cellResult.textContent = isHit ? 'Попала' : 'Не попала';
    cellResult.className = isHit ? 'hit' : 'miss';

    const cellTime = document.createElement('td');
    const now = new Date();
    cellTime.textContent = now.toLocaleString('ru-RU');

    row.appendChild(cellX);
    row.appendChild(cellY);
    row.appendChild(cellR);
    row.appendChild(cellResult);
    row.appendChild(cellTime);

    tbody.appendChild(row);
}