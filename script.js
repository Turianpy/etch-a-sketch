const DEFAULTSIZE = 16
const DEFAULTMODE = 'normal'

const sketchCont = document.querySelector('.sketch-cont')
const slider = document.getElementById('slider')
const sliderVal = document.getElementById('slider-value')
const canvasSlider = document.getElementById('canvas-slider')
const canvasSizeVal = document.getElementById('canvas-size-val')
const colorInput = document.getElementById('color-picker')
const canvasColorInput = document.getElementById('canvas-color')
const regularModeBtn = document.getElementById('normal')
const randomBtn = document.getElementById('random')
const eraserBtn = document.getElementById('erase')
const clearBtn = document.getElementById('clear')
const btns = document.querySelectorAll('.btn.brush')

let color = colorInput.value
let canvasColor = canvasColorInput.value

// stolen from sm1 else. I think onmousedown/up is bad practice but looks good //
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let mode = DEFAULTMODE

function modeChange(newMode) {
    for (let btn of btns) {
        if (btn.id != newMode) {
            btn.classList.remove('active')
        } else btn.classList.add('active')
    }
}

function setMode(newMode) {
    mode = newMode;
    modeChange(mode)
}

function createGrid(num) {

    sketchCont.innerHTML=''
    sketchCont.style.display = "grid";
    sketchCont.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    sketchCont.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num*num; i++) {
        const gridSquare = document.createElement(`div`)
        gridSquare.setAttribute('id', `grid-${i}`)
        gridSquare.setAttribute('class', 'canvas-pixel')
        gridSquare.addEventListener('mouseover', paint)
        gridSquare.addEventListener('mousedown', paint)
        sketchCont.appendChild(gridSquare)
    }
}

function paint(e) {
    if (e.type == 'mouseover' && !mouseDown) {return}
    if (mode == 'random') {
        const R = Math.floor(Math.random() * 256)
        const G = Math.floor(Math.random() * 256)
        const B = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`
    } else if (mode == 'normal') {
        e.target.style.backgroundColor = color;
    } else if (mode == 'erase') {
        e.target.style.backgroundColor = canvasColor;
    }
}

function clearCanvas() {
    createGrid(slider.value)
}

// Event listeners //

colorInput.addEventListener('input', () => {
    color = colorInput.value
})

canvasColorInput.addEventListener('input', () => {
    canvasColor = canvasColorInput.value
    sketchCont.style.backgroundColor = canvasColor
})

regularModeBtn.addEventListener('click', () => setMode('normal'));
randomBtn.addEventListener('click', () => setMode('random'));
eraserBtn.addEventListener('click', () => setMode('erase'));
clearBtn.addEventListener('click', () => clearCanvas());

slider.addEventListener('input', () => {
    sliderVal.innerHTML = `${slider.value} x ${slider.value}`
}, false)

slider.addEventListener('change', () => {
    createGrid(slider.value)
})

canvasSlider.addEventListener('input', () => {
    canvasSizeVal.innerHTML = `${canvasSlider.value}%`
})

canvasSlider.addEventListener('change', () => {
    let newSize = (60 / 100) * canvasSlider.value
    sketchCont.setAttribute('style', `height: ${newSize}vh; width: ${newSize}vh`)
})

window.addEventListener('load', () => createGrid(DEFAULTSIZE))