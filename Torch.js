class Torch {
    constructor(x, y) {
        this.body = Bodies.circle(x, y, 30)
    }

    show() {
        //torch
        push();
        img.resize(100, 100);
        translate(100, 550);
        rotate(90);
        image(img, 0 - img.width / 2, 0 - img.width / 2);
        imageMode(CENTER);
        pop();
        noStroke();
    }
}