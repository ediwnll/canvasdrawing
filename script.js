const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = '#333333';
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.querySelector('.colorPicker');
const colorBtn = document.querySelector('.colorBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraseBtn = document.querySelector('.eraserBtn');
const clearBtn = document.querySelector('.clearBtn');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('.sizeSlider');

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true

function draw(e){
if(!isDrawing) return; //stop function from running if not mouse down
console.log(e);

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); //start from
ctx.moveTo(lastX, lastY); //go to
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();

lastX = e.offsetX;
lastY = e.offsetY;
[lastX, lastY] = [e.offsetX, e.offsetY];
hue++;
if(hue>= 360){
    hue = 0;
}

if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction =! direction;
}
if(direction){
    ctx.lineWidth++;
}
else{
    ctx.lineWidth--;
}


}

canvas.addEventListener('mousedown', (e)=> {
isDrawing = true;
[lastX, lastY] = [e.offsetX, e.offsetY];

});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);

colorPicker.oninput = (e)=> setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraseBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value);

function reloadGrid(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setCurrentColor(newColor){
    currentColor = newColor;
}
function setCurrentMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
}

function  setCurrentSize(newSize){
    currentSize = newSize;
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraseBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraseBtn.classList.add('active')
    }
}


