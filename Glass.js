class Glass {
    constructor(x, y, w, h) {
        let options = {
            isStatic: true,
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
        if (dist(this.body.position.x, this.body.position.y, mouseX, mouseY) < 70) {
            fill(255, 255, 255, 70)
            stroke(25)
            ellipse(0, 0, 140)
        }
        noFill()
        strokeWeight(10)
        stroke(255)
        rotate(angle)
        rectMode(CENTER)
        rect(0, 0, this.w, this.h)
        pop()
    }
}