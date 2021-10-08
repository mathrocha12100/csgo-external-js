const canvas = document.getElementById('discordo-overlay');
const ctx = canvas.getContext("2d");

function DrawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function DrawCircle() {
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
}
