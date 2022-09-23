class Mirror {
    constructor(x, y, w, h, fixed) {
        this.fixed = fixed;
        let options = {
            isStatic: this.fixed,
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.h = h;
        this.w = w;
        this.body.angle = 0
        Composite.add(world, this.body)
    }
    show() {
        const pos = this.body.position
        const angle = this.body.angle
        fill(255, 255, 255, 50)
        push()
        translate(pos.x, pos.y)
        if (dist(this.body.position.x, this.body.position.y, mouseX, mouseY) < 150) {

            stroke(25)
            ellipse(0, 0, 300)

            fill(255, 255, 255, 30)
            stroke(25)
            ellipse(0, 0, 140)
        }
        if (dist(this.body.position.x, this.body.position.y, mouseX, mouseY) < 50) {
            fill(255, 255, 255, 70)
            stroke(25)
            ellipse(0, 0, 140)
        }
        fill(255)
        rotate(angle)
        rectMode(CENTER)
        rect(0, 0, this.w, this.h)
        pop()
    }

    // setMovable() {
    //     this.body.isStatic = false;
    // }


}

