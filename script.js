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
let shelf;
let stage;

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

    mirror.show()
    glass.show()
    circles.forEach(circle => {
        circle.show()
    })


    console.log(mirror.body)

}


function mouseDragged() {


    if (dist(mirror.body.position.x, mirror.body.position.y, mouseX, mouseY) < 70) {
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















