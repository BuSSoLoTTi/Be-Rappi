class Pontao {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}


const p1 = new Pontao(50, 50)
const p2 = new Pontao(750, 50)
const p3 = new Pontao(50, 750)
const p4 = new Pontao(750, 750)


let count = 0;
let corzinha = 0;


function setup() {
    createCanvas(800, 800);


    background(220);

    stroke('purple'); // Change the color
    strokeWeight(10);
    desenha().then(r => {

        console.log("done")
    })

}


async function desenha() {


    point(p1.x, p1.y)
    point(p2.x, p2.y)
    point(p3.x, p3.y)
    point(p4.x, p4.y)

    await sleep(500)
    await midle(p1, p2, p3, p4)
    await midle(p1, p2, p3, p4)


}

async function midle(pp1, pp2, pp3, pp4) {


    stroke("black");
    strokeWeight(5);

    const pp5 = new Pontao((pp2.x + pp1.x) / 2, (pp1.y + pp2.y) / 2)
    const pp6 = new Pontao((pp2.x + pp4.x) / 2, (pp2.y + pp4.y) / 2)
    const pp7 = new Pontao((pp3.x + pp4.x) / 2, (pp4.y + pp3.y) / 2)
    const pp8 = new Pontao((pp1.x + pp3.x) / 2, (pp1.y + pp3.y) / 2)
    const pp9 = new Pontao((pp2.x + pp3.x) / 2, (pp2.y + pp3.y) / 2)


    await sleep(200)


    point(pp5.x, pp5.y)
    point(pp6.x, pp6.y)
    point(pp7.x, pp7.y)
    point(pp8.x, pp8.y)
    point(pp9.x, pp9.y)


    count++;

    if (count < 7000) {
        midle(pp1, pp5, pp8, pp9)
        midle(pp5, pp2, pp9, pp6)
        midle(pp9, pp6, pp7, pp4)
        midle(pp8, pp9, pp3, pp7)
    }
}


function sleep(millisecondsDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondsDuration);
    })
}


class Color {
    constructor(r, g, b) {
        this.r = r
        this.g = g
        this.b = b
    }
}

function Wheel(WheelPos) {
    WheelPos = 255 - WheelPos;
    if (WheelPos < 85) {
        return new Color(255 - WheelPos * 3, 0, WheelPos * 3);
    } else if (WheelPos < 170) {
        WheelPos -= 85;
        return new Color(0, WheelPos * 3, 255 - WheelPos * 3);
    } else {
        WheelPos -= 170;
        return new Color(WheelPos * 3, 255 - WheelPos * 3, 0);
    }
}


function draw() {


}
