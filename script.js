// destructuring required items from matter.js
let { Engine, Bodies, Composite, Body } = Matter

//initialise torch svg
let img;
function preload() {
    img = loadImage("../img/flashlight.svg");
}

// global variables
let world;
let engine;
let mirror;
let glass;

function setup() {
    // setting up canvas
    createCanvas(1280, 720)
    angleMode(DEGREES)
    rectMode(CENTER)

    //setting up the physics engine
    engine = Engine.create();
    world = engine.world;

    // objects in the world
    mirror = new Mirror(200, 200, 20, 100)
    glass = new Glass(1000, 200, 40, 100)
}

//animation loop
function draw() {
    Engine.update(engine)
    background(102)

    //screens
    fill(0)
    //shelf
    rect(width / 2, 200, 1200, 250)
    //activity area
    rect(width / 2, 550, 1200, 270)

    //Light
    if (mirror.body.position.y < 380 && glass.body.position.y < 380) {
        strokeWeight(20);
        stroke(255, 255, 255);
        line(155, 550, width - 60, 550);
    } else if (mirror.body.position.y === 550) {
        strokeWeight(20);
        stroke(255, 255, 255);
        line(155, 550, width / 2, 550);
    } else if (glass.body.position.y === 550 && glass.body.angle != 0) {
        strokeWeight(20);
        stroke(255, 255, 255);
        line(155, 550, width / 2 - 23, 550);
    } else {
        strokeWeight(20);
        stroke(255, 255, 255);
        line(155, 550, width - 60, 550);
    }
    //Reflection or Refraction 
    //check for mirror or slab
    if (mirror.body.position.y === 550) {
        push()
        translate(width / 2, 550)
        strokeWeight(20);
        rotate(mirror.body.angle * 2)
        stroke(255, 255, 255, 200)
        gradientLine(0, 0, -500, 0, 'white', 'black');
        pop()
    } else if (glass.body.position.y === 550) {
        push()
        translate(width / 2 - 23, 550)
        //angle of refraction
        rotate(asin(sin(glass.body.angle)) - 180)
        strokeWeight(20);
        stroke(255, 255, 255);
        gradientLine(0, 0, -40, 0, 'white', 'seashell');
        pop();
        //update shape based on +ve rotation
        if (glass.body.angle < 538) {
            const thickness = 40;
            const l = thickness * (sin(glass.body.angle - asin(sin(glass.body.angle))) / cos(asin(sin(glass.body.angle))))
            push()
            translate(width / 2, 550)
            if (l > 0) {
                strokeWeight(20);
                stroke(255, 255, 255, 100)
                line(25, l - 3, 600, l)
            }
            pop()
        } else if
            //update shape based on -ve rotation
            (glass.body.angle > 538) {
            const thickness = 40;
            const l = thickness * (sin(glass.body.angle - asin(sin(glass.body.angle))) / cos(asin(sin(glass.body.angle))))
            push()
            translate(width / 2, 550)
            if (l < 0) {
                // fill(255, 0, 0)
                strokeWeight(20);
                stroke(255, 255, 255, 100);
                // ellipse(0, 0, 1)
                line(25, l + 3, 600, l)
            }
            pop()
        };
    }
    noStroke();
    strokeWeight(3)
    //draw mirror and glass
    mirror.show()
    glass.show()

    //torch
    push();
    img.resize(100, 100);
    translate(100, 550);
    rotate(90);
    image(img, 0 - img.width / 2, 0 - img.width / 2);
    imageMode(CENTER);
    pop();
};

//Mouse Events
//Responsible for dragging objects and snapping them in place release
function mouseDragged() {
    //calculate distance between mouse and center of body
    let dSlab = dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY)
    let dMirror = dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY)

    if (dMirror < 70) {
        Body.setPosition(mirror.body, { x: mouseX, y: mouseY })
    }
    if (dSlab < 70) {
        Body.setPosition(glass.body, { x: mouseX, y: mouseY })
    }
    if (dMirror < 150 && dMirror > 70) {
        if (mouseY < 586 && mouseY > 493) {
            Body.setAngle(mirror.body, mouseY)
        }
    }
    if (dSlab < 150 && dSlab > 70) {
        if (mouseY < 555 && mouseY > 525) {

            Body.setAngle(glass.body, mouseY)
        }
    }
}
function mouseReleased() {
    //calculate distance between mouse and center of body
    let dSlab = dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY)
    let dMirror = dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY)

    if (dMirror < 70) {
        if (mouseY < 360) {
            Body.setPosition(mirror.body, { x: 200, y: 200 });
        } else {
            if (glass.body.position.y > 360) {
                Body.setPosition(glass.body, { x: 1000, y: 200 })
            }
            Body.setPosition(mirror.body, { x: width / 2, y: 550 })
        }
    }
    if (dSlab < 70) {
        if (mouseY < 360) {
            Body.setPosition(glass.body, { x: 1000, y: 200 })
        } else {
            if (mirror.body.position.y > 360) {
                Body.setPosition(mirror.body, { x: 200, y: 200 })
            };
            Body.setPosition(glass.body, { x: width / 2, y: 550 })
        }
    }
}

//create linear gradient for strokeStyle
function gradientLine(x1, y1, x2, y2, color1, color2) {
    // linear gradient from start to end of line
    let grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    this.drawingContext.strokeStyle = grad;
    line(x1, y1, x2, y2);
}















