const canvas = document.getElementById('coordinate-plane');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX= width/2;
const centerY= height/2;
const R = 3;
const scale = 140;


function toCanvasX(x){
    return centerX + x*scale;
}
function toCanvasY(y){
    return centerY - y*scale;
}
function drawCanvas(R) {
    const color = 'rgba(52,152,219,0.7)'
    ctx.fillStyle = color;
    ctx.fillRect(
        toCanvasX(0),
        toCanvasY(R/2),
        R * scale,
        R/2 * scale
    );

    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(0));
    ctx.lineTo(toCanvasX(-R), toCanvasY(0));
    ctx.lineTo(toCanvasX(0), toCanvasY(R / 2));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(0));
    ctx.lineTo(toCanvasX(- R / 2), toCanvasY(0));
    ctx.arc(
        toCanvasX(0),
        toCanvasY(0),
        (R / 2) * scale,
        Math.PI,
        Math.PI / 2,
        true
    )
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 20, centerY - 10);
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 20, centerY + 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 10, 20);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 10, 20);
    ctx.stroke();


    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('X', width - 20, centerY - 20);
    ctx.fillText('Y', centerX - 20, 40);
    const xMarks = [-R, -R / 2, R / 2, R];
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';

    xMarks.forEach(function (x) {
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, centerY - 10);
        ctx.lineTo(canvasX, centerY + 10);
        ctx.stroke();

        let label;
        if (x === -R) label = '-R';
        else if (x === -R / 2) label = '-R/2';
        else if (x === R) label = 'R';
        else label = 'R/2';

        ctx.fillText(label, canvasX, centerY + 40);
    });
    const yMarks = [-R, -R / 2, R / 2, R];
    ctx.textAlign = 'right';

    yMarks.forEach(function (y) {
        const canvasY = toCanvasY(y);

        ctx.beginPath();
        ctx.moveTo(centerX - 10, canvasY);
        ctx.lineTo(centerX + 10, canvasY);
        ctx.stroke();

        let label = y;
        if (y === -R) label = '-R';
        else if (y === -R / 2) label = '-R/2';
        else if (y === R / 2) label = 'R/2';
        else if (y === R) label = 'R';

        ctx.fillText(label, centerX - 20, canvasY + 10);
    });
}
drawCanvas(R);

function submitForm(event){
    event.preventDefault();
    clearErrors();
    const x = getSelectedCheckboxValue('x');
    const y = document.getElementById('y-input').value.trim();
    const r = getSelectedCheckboxValue('r');
    console.log(x,y,r);

    if (x ===null){
        showError('x-error', "Выберите значение Х" );
        return;
    }
    if (x === 'multiple') {
        showError('x-error', "Выберите только одно значение X (не несколько)");
        return;
    }
    if (y === '') {
        showError('y-error', 'Введите значение Y');
        return;
    }
    const yRegex = /^-?\d+([.,]\d+)?$/;
    if (!yRegex.test(y)) {
        showError('y-error', 'Y должен быть числом (например: 2, -1.5, 0)');
        return;
    }

    const yNum = parseFloat(y.replace(',', '.'));
    if (yNum < -3 || yNum > 5) {
        showError('y-error', 'Y должен быть от -3 до 5');
        return;
    }

    if (r === null) {
        showError('r-error', 'Выберите значение R');
        return;
    }
    if (r === 'multiple') {
        showError('r-error', "Выберите только одно значение R (не несколько)");
        return;
    }

    const xNum = parseFloat(x);
    const rNum = parseFloat(r);

    const isHit = checkHit(xNum, yNum, rNum);
    ctx.clearRect(0, 0, width, height);
    drawCanvas(r);
    drawPoint(xNum, yNum, rNum, isHit);
    const result = {
        x: xNum,
        y: yNum,
        r: rNum,
        isHit: isHit,
        timestamp: new Date().toISOString()
    };
    const row =createResultRow(result);
    document.getElementById('results-body').appendChild(row);
    saveToLocalStorage(result);
}
function checkHit(x, y, R) {
    const inRectangle = (x >= 0 && x <= R) && (y >= 0 && y <= R / 2);
    const inTriangle = (x >= -R && x <= 0) && (y >= 0) && (y <= x / 2 + R / 2);
    const inCircle = (x <= 0 && y <= 0) && (x * x + y * y <= (R / 2) * (R / 2));
    return inRectangle || inCircle || inTriangle;
}


function getSelectedCheckboxValue(name){
    const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
    if (checked.length === 0) return null;
    if (checked.length>1){
        return 'multiply';
    }
    return checked[0].value;
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
    const canvasX = toCanvasX(x);
    const canvasY = toCanvasY(y);

    ctx.fillStyle = isHit ? '#27ae60' : '#e74c3c';

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 12, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}
function saveToLocalStorage(result){
    try{
        const results = JSON.parse(localStorage.getItem('pointResults')|| '[]');
        results.push(result);
        localStorage.setItem('pointResults', JSON.stringify(results));
    }catch (e) {
        console.error('Ошибка при сохранении в LocalStorage:', e);
    }
}

function loadFromLocalStorage(){
    try {
        const results = JSON.parse(localStorage.getItem('pointResults')|| '[]');
        const tbody = document.getElementById('results-body');
        tbody.innerHTML = '';

        results.forEach(item =>{
            const row = createResultRow(item);
            tbody.appendChild(row);
        });
    }catch (e) {
        console.error('Ошибка при загрузке из LocalStorage:', e);
    }
}
function createResultRow(item) {
    const row = document.createElement('tr');
    const cellX = document.createElement('td');
    cellX.textContent = item.x;
    const cellY = document.createElement('td');
    cellY.textContent = item.y;
    const cellR = document.createElement('td');
    cellR.textContent = item.r;
    const cellResult = document.createElement('td');
    cellResult.textContent = item.isHit ? 'Попала' : 'Не попала';
    cellResult.className = item.isHit ? 'hit' : 'miss';
    const cellTime = document.createElement('td');
    const date = new Date(item.timestamp);
    cellTime.textContent = date.toLocaleString('ru-RU', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    row.appendChild(cellX);
    row.appendChild(cellY);
    row.appendChild(cellR);
    row.appendChild(cellResult);
    row.appendChild(cellTime);

    return row;
}
document.getElementById('clear-btn').addEventListener('click', async () => {
    if (confirm('Вы уверены, что хотите удалить все результаты?')) {
        localStorage.removeItem('pointResults');
        document.getElementById('results-body').innerHTML = '';
    }
});
function makeCheckboxesExclusive(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    if (checkboxes.length === 0) {
        console.warn(`Группа чекбоксов "${groupName}" не найдена`);
        return false;
    }
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes.forEach(other => {
                    if (other !== this) {
                        other.checked = false;
                    }
                });
            }
        });
    });

    return true;
}

makeCheckboxesExclusive('x');
makeCheckboxesExclusive('r');

const form = document.getElementById('point-form');
form.addEventListener('submit', submitForm );
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    ctx.clearRect(0, 0, width, height);
    drawCanvas(R);
});