let form = document.querySelector("form");
let drawing_area = document.querySelector("div.drawing-area");

function loop() {
    setTimeout(loop, 10);
    drawing_area.style.setProperty("--time", drawing_area.style.getPropertyValue("--time")-0+1);
}
loop();


class Coordonnee {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    add(obj) {
        this.x += obj.x;
        this.y += obj.y;
    }

    rem(obj) {
        this.x -= obj.x;
        this.y -= obj.y;
    }
}

class Taille {
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }
}

class Couleur {
    constructor (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGBString() {
        return `rgba(${this.r*256}, ${this.g*256}, ${this.b*256}, 0.7)`;
    }
}

class Forme {
    constructor (coord) {
        this.coord = coord;
        this.size = new Taille(20+Math.random()*80, 20+Math.random()*80);
        this.color = new Couleur(Math.random(), Math.random(), Math.random());
        this.angle = Math.random() * 360;
        this.dom_elmt = document.createElement("div");

        this.dom_elmt.addEventListener("contextmenu", event => {
            this.efface();
            event.preventDefault();
        });
    }

    draw() {
        this.dom_elmt.classList.add("forme");
        this.dom_elmt.style.left = this.coord.x + "px";
        this.dom_elmt.style.top = this.coord.y + "px";
        this.dom_elmt.style.width = this.size.width + "px";
        this.dom_elmt.style.height = this.size.height/2 + "px";
        this.dom_elmt.style.backgroundColor = this.color.getRGBString();
        this.dom_elmt.style.setProperty("--angle", this.angle + "deg");
        this.dom_elmt.style.setProperty("--anim-speed", 2*Math.random()-1);
        drawing_area.appendChild(this.dom_elmt);
    }

    efface() {
        this.dom_elmt.remove();
    }
}

class FormeSVG extends Forme {
    constructor (coord, svgContent) {
        super(coord);
        this.svgContent = svgContent;
    }

    draw() {
        super.draw();
        this.dom_elmt.innerHTML = `<svg viewBox="0 0 100 100" fill="${this.color.getRGBString()}" width="100%" height="100%" preserveAspectRatio="none">
            ${this.svgContent}
        </svg>`;
        this.dom_elmt.style.backgroundColor = null;
    }
}

class Rectangle extends Forme {
    
}

class Elipse extends Forme {
    draw() {
        super.draw()
        this.dom_elmt.style.borderRadius = "50%";
    }
}

class Triangle extends FormeSVG {
    constructor (coord) {
        super(coord, '<polygon points="50,0 100,100 0,100">');
    }
}

class Star extends FormeSVG {
    constructor (coord) {
        super(coord, '<polygon points="50,0 62,38 100,50 62,62 50,100 38,62 0,50 38,38">');
    }
}

let formes = {
    "rect": Rectangle,
    "elps": Elipse,
    "trgl": Triangle,
    "star": Star,
};

drawing_area.addEventListener("click", event => {
    let pos = new Coordonnee(event.clientX, event.clientY);
    pos.rem(drawing_area.getBoundingClientRect());

    let forme_key = form.forme.value;
    if (forme_key == "rand") {
        forme_key = Object.keys(formes)[Math.floor(Math.random() * Object.keys(formes).length)];
    }

    if (forme_key in formes) {
        let forme = new formes[forme_key](pos);
        forme.draw();
    }
});

