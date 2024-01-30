urls = [
    "/img/android-webview_128x128.png",
    "/img/opera_128x128.png",
    "/img/android-webview-beta_128x128.png",
    "/img/opera-mini_128x128.png",
    "/img/basilisk_128x128.png",
    "/img/pale-moon_128x128.png",
    "/img/brave_128x128.png",
    "/img/safari_128x128.png",
    "/img/chrome_128x128.png",
    "/img/safari-ios_128x128.png",
    "/img/chrome-canary_128x128.png",
    "/img/samsung-internet_128x128.png",
    "/img/chromium_128x128.png",
    "/img/seamonkey_128x128.png",
    "/img/edge_128x128.png",
    "/img/servo_128x128.png",
    "/img/electron_128x128.png",
    "/img/uc_128x128.png",
    "/img/firefox_128x128.png",
    "/img/vivaldi_128x128.png",
    "/img/firefox-developer-edition_128x128.png",
    "/img/webkit_128x128.png",
    "/img/jsdom_128x128.png",
    "/img/yandex_128x128.png",
];

const size = 1500;

function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;

        img.addEventListener("load", () => resolve(img));
    });
}

function drawImage(ctx, img) {
    for (let index = 0; index < 5; index++) {
        let x = Math.random()*size;
        let y = Math.random()*size;
        ctx.drawImage(img, x, y);
        ctx.drawImage(img, x, y-size);
        ctx.drawImage(img, x-size, y);
        ctx.drawImage(img, x-size, y-size);
    }
}

function combineImages(urls) {
    let canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    let ctx = canvas.getContext("2d");
    

    return new Promise((resolve, reject) => {
        let promices = [...urls].map(url => {
            return loadImage(url).then(img => {
                return drawImage(ctx, img);
            });
        });

        Promise.all(promices).then(() => {
            resolve(canvas.toDataURL());
        });
    });
}

function loop() {
    combineImages(urls).then(dataURL => {
        document.body.style.background = `url(${dataURL})`;
        document.body.style.backgroundSize = `300px`;
    }).finally(() => {
        setTimeout(loop, 1000);
    });
}
loop();