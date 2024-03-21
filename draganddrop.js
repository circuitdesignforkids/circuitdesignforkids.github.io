let maxLeft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta;
let imgs = [
    "BatteryICONup.png",
    "Resistor.png",
    "StarICONfull.png"
]
var originalX;
var originalY;

window.onload = function () {
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick() {
    if (Date.now() - timeDelta < 150) { // check that we didn't drag
        createPopup(this);
    }
}

// // create a popup when we click
// function createPopup(parent) {
//     let p = document.getElementById("popup");
//     if (p) {
//         p.parentNode.removeChild(p);
//     }

//     let popup = document.createElement("div");
//     popup.id = "popup";
//     popup.className = "popup";
//     popup.style.top = parent.y - 110 + "px";
//     popup.style.left = parent.x - 75 + "px";

//     let text = document.createElement("span");
//     text.textContent = parent.id;
//     popup.appendChild(text);

//     var map = document.getElementsByClassName("map")[0];
//     map.appendChild(popup);
// }

// when our base is loaded
function baseOnLoad() {
    var map = document.getElementsByClassName("map")[0];
    let base = document.getElementsByClassName("base")[0];
    maxLeft = base.width - 50;
    maxTop = base.height - 50;

    /* my smaller images: */
    for (let i = 0; i < 6; i++) {
        let sensor = document.createElement("img");
        sensor.src = imgs[i % imgs.length];
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = true;
        sensor.classList.add("sensor");
        sensor.classList.add("dragme");
        sensor.style.left = `${Math.floor(Math.random() * 900)}px`
        sensor.style.top = `${Math.floor(Math.random() * 500)}px`
        sensor.onclick = sensorClick;

        let parent = document.getElementsByClassName("map")[0];
        parent.appendChild(sensor);
    }
}

function startDrag(e) {
    timeDelta = Date.now(); // get current millis

    // determine event object
    if (!e) var e = window.event;

    // prevent default event
    if (e.preventDefault) e.preventDefault();

    // IE uses srcElement, others use target
    targ = e.target ? e.target : e.srcElement;

    originalX = targ.style.left;
    originalY = targ.style.top;

    // check that this is a draggable element
    if (!targ.classList.contains('dragme')) return;

    // calculate event X, Y coordinates
    offsetX = e.clientX;
    offsetY = e.clientY;

    // calculate integer values for top and left properties
    coordX = parseInt(targ.style.left);
    coordY = parseInt(targ.style.top);
    drag = true;

    document.onmousemove = dragDiv; // move div element
    return false; // prevent default event
}

function dragDiv(e) {
    if (!drag) return;
    if (!e) var e = window.event;

    // move div element and check for borders
    let newLeft = coordX + e.clientX - offsetX;
    if (newLeft < maxLeft && newLeft > minLeft) targ.style.left = newLeft + 'px'

    let newTop = coordY + e.clientY - offsetY;
    if (newTop < maxTop && newTop > minTop) targ.style.top = newTop + 'px'

    return false; // prevent default event
}

function stopDrag() {
    if (typeof drag == "undefined") return;

    if (drag) {
        if (Date.now() - timeDelta > 150) { // we dragged
            let p = document.getElementById("popup");
            if (p) {
                p.parentNode.removeChild(p);
            }
        } else {
            targ.style.left = originalX;
            targ.style.top = originalY;
        }
    }

    drag = false;
}
