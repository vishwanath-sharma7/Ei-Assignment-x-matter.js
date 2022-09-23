class Box {
    constructor(x, y, w, h) {
        let options = {
            friction: 1,
            restitution: 0
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        Composite.add(world, this.body);
    }


    show() {
        push()
        stroke(255)
        fill(0)
        rectMode(CENTER)
        translate(this.body.position.x, this.body.position.y)
        rotate(this.body.angle)
        rect(0, 0, this.w, this.h)
        pop()
    }
}