const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
c.width = w;
c.height = h;


const loop = () => {
    ctx.clearRect(0, 0, w, h);
    //console.log(generateLine(genData.varArr));
    requestAnimationFrame(loop);
}
loop();