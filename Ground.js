class Ground {
    constructor(x, y, w, h) {
        let options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        Composite.add(world, this.body);

    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push()
        fill(255)
        translate(pos.x, pos.y)
        rectMode(CENTER)
        rotate(angle)
        rect(0, 0, this.w, this.h)
        pop()
    }
}