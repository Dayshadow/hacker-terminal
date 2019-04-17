const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
c.width = w;
c.height = h;

let tc = new TextConsole(0, 0, w/2, h/2);

let f = 0;
const loop = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    f++;
    if (f % 16 == 0) {
        tc.addCode();
    }
    tc.draw();
    tc.update();
    requestAnimationFrame(loop);
}
loop();