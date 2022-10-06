const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = '333333';
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
ctx.lineWidth = 16;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true


function getColor() {
    let input = document.querySelector('.colorPicker')
    let color = HexToHSL(input.value)
    //console.log('hsl(' + color.h + ', ' + color.s + '%, ' + color.l + '%)')
    return color;
}

function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}

function draw(e){
    if(!isDrawing) return; //stop function from running if not mouse down
    //console.log(e);
    let picker = getColor()
    let hx = picker.h;
    let sx = picker.s;
    let lx = picker.l;
    ctx.beginPath(); //start from
    ctx.moveTo(lastX, lastY); //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    if(currentMode === 'rainbow'){
        ctx.strokeStyle = `hsl(${hx}, ${sx}%, ${lx}%)`;
        console.log(`hsl(${hx}, ${sx}%, ${lx}%)`)
        if(picker.h>= 360){
        picker.h = 0;
        
    }
    }
    else if(currentMode === 'color'){
        ctx.strokeStyle = `hsl(${hx}, ${sx}%, ${lx}%)`;
        //console.log(hue);
    }
    else if(currentMode ==='eraser'){
        ctx.strokeStyle = `hsl(0, 0%, 100%)`;
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
colorPicker.oninput = ()=> getColor();
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

function updateSizeValue(value){
    sizeValue.innerHTML = `Size: ${value} px`;
}

function changeSize(value){
    ctx.lineWidth = value;
}

