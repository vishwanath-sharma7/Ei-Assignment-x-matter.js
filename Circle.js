class Circle {
    constructor(x, y, r, fixed) {
        let options = {
            friction: 0.2,
            restitution: 1,
            isStatic: fixed
        }
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        Composite.add(world, this.body);
    }


    show() {
        push()
        stroke(255)
        fill(0)
        rectMode(CENTER)
        translate(this.body.position.x, this.body.position.y)
        rotate(this.body.angle)
        ellipse(0, 0, this.r * 2)
        fill(255, 0, 0)
        line(0, 0, this.r / 2, this.r / 2)
        pop()
    }
}