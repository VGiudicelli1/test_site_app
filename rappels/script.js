const size_max = 10;

let champ = document.querySelector("#champ");
let restants = document.querySelector("#restants");
let photo = document.querySelector("#photo");
let label_photo = document.querySelector("label[for=photo]");
let button = document.querySelector("button");

champ.addEventListener("input", check);
photo.addEventListener("change", check);

function check() {
    let nbCharRestants = size_max - champ.value.length;
    if (photo.checked) {
        nbCharRestants -= 5;
        label_photo.innerText = "Une photo";
    } else {
        label_photo.innerText = `Pas de photo`;
    }
    restants.innerText = nbCharRestants;

    button.disabled = (nbCharRestants < 0);
    if (nbCharRestants < 0) {
        restants.classList.add("limite");
    } else {
        restants.classList.remove("limite");
    }
}
check();


let items = document.querySelectorAll("li");
for(let i = 0; i<items.length; i++) {
    items[i].addEventListener("click", event => { 
        console.log("click [let] : " + i);
    });
}
for(var i = 0; i<items.length; i++) {
    items[i].addEventListener("click", event => { 
        console.log("click [var] : " + i);
    });
}