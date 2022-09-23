let { Engine, Bodies, Composite, Constraint, MouseConstraint, Mouse, Body } = Matter

//initialise torch svg
let img;
function preload() {
    img = loadImage("../img/flashlight.svg");
}

// let ground;
let world;
let engine;
let boxes = [];
let mirror;
let circles = [];
let constraint;
let mConstraint;
let mirrorFixed = false;
let glass;
let shelf;
let stage;
let light;

function setup() {
    let canvas = createCanvas(1280, 720)
    angleMode(DEGREES)
    rectMode(CENTER)
    engine = Engine.create();
    world = engine.world;
    mirror = new Mirror(200, 200, 20, 100, true)
    glass = new Glass(1000, 200, 40, 100, true)
    shelf = new Screen(width / 2, 200, 1200, 250)
    stage = new Screen(width / 2, 550, 1200, 270)
    light = new Torch(200, 550)

    let canvasMouse = Mouse.create(canvas.elt)
    canvasMouse.pixelRatio = pixelDensity();

    let options = {
        mouse: canvasMouse
    }

    mConstraint = MouseConstraint.create(engine, options)
    Composite.add(world, mConstraint)
}


function draw() {
    Engine.update(engine)
    background(102)
    shelf.show()
    stage.show()

    circles.forEach(circle => {
        circle.show()
    })

    //light
    if (mirror.body.position.y < 380 && glass.body.position.y < 380) {
        strokeWeight(15);
        stroke(255, 255, 255);
        line(155, 550, width - 60, 550);
    } else if (mirror.body.position.y === 550) {
        strokeWeight(15);
        stroke(255, 255, 255);
        line(155, 550, width / 2, 550);
    } else if (glass.body.position.y === 550 && glass.body.angle != 0) {
        strokeWeight(15);
        stroke(255, 255, 255);
        line(155, 550, width / 2 - 23, 550);
    } else {
        strokeWeight(15);
        stroke(255, 255, 255);
        line(155, 550, width - 60, 550);
    }
    light.show()


    //check for mirror or slab
    if (mirror.body.position.y === 550) {
        push()
        translate(width / 2, 550)
        strokeWeight(15);
        rotate(mirror.body.angle * 2)
        stroke(255, 255, 255, 200)
        line(0, 0, -500, 0)
        pop()
    } else if (glass.body.position.y === 550) {
        push()
        translate(width / 2 - 23, 550)
        //angle of refraction
        rotate(asin(sin(glass.body.angle)) - 180)
        strokeWeight(15);

        // console.log(asin(sin(slab.rotation / 1.6)))
        stroke(255, 255, 255)
        strokeCap(PROJECT)
        line(0, 0, -(40), 0)
        pop()

        //update shape based on +ve rotation
        if (glass.body.angle < 538) {
            const thickness = 40;
            const l = thickness * (sin(glass.body.angle - asin(sin(glass.body.angle))) / cos(asin(sin(glass.body.angle))))
            push()
            translate(width / 2, 550)
            if (l > 0) {
                strokeWeight(15);

                stroke(255, 255, 255, 100)
                // ellipse(0, 0, 1)
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
                strokeWeight(15);

                stroke(255, 255, 255, 100)

                // ellipse(0, 0, 1)
                line(25, l + 3, 600, l)
            }
            pop()
        }


    }
    noStroke();
    strokeWeight(2)
    mirror.show()
    glass.show()

    console.log(glass.body.angle)
}


function mouseDragged() {
    if (dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) < 70) {
        Body.setPosition(mirror.body, { x: mouseX, y: mouseY })
    }
    if (dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) < 70) {

        Body.setPosition(glass.body, { x: mouseX, y: mouseY })
    }

    if (dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) < 150 && dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) > 70) {
        if (mouseY < 586 && mouseY > 493) {
            Body.setAngle(mirror.body, mouseY)
        }
    }
    if (dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) < 150 && dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) > 70) {
        if (mouseY < 555 && mouseY > 525) {

            Body.setAngle(glass.body, mouseY)
        }
    }
}


function mouseReleased() {
    if (mConstraint.body === mirror.body) {
        if (mouseY < 360) {
            Body.setPosition(mirror.body, { x: 200, y: 200 })

        } else {
            if (glass.body.position.y > 360) {
                Body.setPosition(glass.body, { x: 1000, y: 200 })
            }
            Body.setPosition(mirror.body, { x: width / 2, y: 550 })
        }
    }
    if (mConstraint.body === glass.body) {
        if (mouseY < 360) {
            Body.setPosition(glass.body, { x: 1000, y: 200 })
        } else {
            if (mirror.body.position.y > 360) {
                Body.setPosition(mirror.body, { x: 200, y: 200 })

            }
            Body.setPosition(glass.body, { x: width / 2, y: 550 })
        }
    }
}















