let { Engine, Bodies, Composite, Constraint, MouseConstraint, Mouse, Body } = Matter

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

function setup() {
    let canvas = createCanvas(1280, 720)
    angleMode(DEGREES)
    rectMode(CENTER)
    engine = Engine.create();
    world = engine.world;
    mirror = new Mirror(200, 200, 20, 80, true)
    glass = new Glass(1000, 200, 20, 80, true)

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

    mirror.show()
    glass.show()
    circles.forEach(circle => {
        circle.show()
    })


    // console.log(mConstraint)

}


function mouseDragged() {
    if (dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) < 70) {
        console.log('hi')
        Body.setPosition(mirror.body, { x: mouseX, y: mouseY })
    }
    if (dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) < 70) {

        Body.setPosition(glass.body, { x: mouseX, y: mouseY })
    }


    if (dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) < 150 && dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) > 70) {
        Body.setAngle(mirror.body, mouseY)
    }
    if (dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) < 150 && dist(glass.body.position.x, glass.body.position.y, mouseX, mouseY) > 70) {
        Body.setAngle(glass.body, mouseY)
    }



}


function mouseReleased() {
    if (mConstraint.body === mirror.body) {
        if (mouseY < 300) {
            Body.setPosition(mirror.body, { x: 200, y: 200 })
        } else {
            Body.setPosition(mirror.body, { x: width / 2, y: 500 })
        }
    }
    if (mConstraint.body === glass.body) {
        if (mouseY < 300) {
            Body.setPosition(glass.body, { x: 1000, y: 200 })
        } else {
            Body.setPosition(glass.body, { x: width / 2, y: 500 })
        }
    }
}














