const canvas = document.getElementById('discordo-overlay');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function DrawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function DrawCircle(x) {
    ctx.beginPath();
    ctx.arc(x, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
}

(async () => {

    function sleep (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    let x = 10;
    while (true) {

        await sleep (0.1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = '48px serif';
        ctx.fillText('Hello world', x, 50);

        if (x > canvas.width) x = 10;
        x += 10;

    }

})()
