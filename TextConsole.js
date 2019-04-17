class TextConsole {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ly = y + 20; // Line x within window
        this.sdy = -3; // Scroll velocity
        this.lines = [];
    }
    addCode() {
        this.lines = this.lines.concat(generateFunction().split('\n'));
    }
    update() {
        // Remove lines above the top
        for (let i = this.lines.length; i >= 0; i--) {
            if (this.y + (i * 16) + this.ly < 0) {
                this.ly += 16;
                this.lines.splice(i, 1)
            }
        }
    }
    draw() {
        // Save everything that might be overlaid by the text
        let tmp1 = ctx.getImageData(this.x + this.w, this.y, 2000, 2000);
        let tmp2 = ctx.getImageData(this.x, this.y + this.h, 2000, 2000);

        // Draw the text line-by-line
        ctx.font = this.h / 36 + "px arial";
        ctx.fillStyle = "#00ff00"
        for (let i = this.lines.length; i >= 0; i--) {
            ctx.fillText(this.lines[i], this.x + 20, this.y + 20 + (i * 16) + this.ly);

            if (this.y + (i * 16) + this.ly > h) {
                this.ly -= 4; // Because this acts on every line it makes the text move faster as more lines are offscreen.
            }
        }

        // Draw a border
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        // Clear the text to keep it within it's boundaries
        ctx.clearRect(this.x + this.w, this.y, 2000, 2000);
        ctx.clearRect(this.x, this.y + this.h, 2000, 2000);

        // Restore the stuff that was there before
        ctx.putImageData(tmp1, this.x + this.w, this.y);
        ctx.putImageData(tmp2, this.x, this.y + this.h);
    }
}