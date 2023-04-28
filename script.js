"use strict";
let Width, height, lineSize, num = 15, count = 0, decline = 0.25;
const { 
    sin, 
    cos, 
    PI, 
    random, 
    round
} = Math;

function atan(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    
    if (dx == 0) {
        if (dy >= 0) {
            return PI / 2;
        } else {
            return (3 / 2) * PI;
        }

    } else if (dx > 0) {
        return Math.atan(dy / dx);

    } else {
        return PI + Math.atan(dy / dx);
    }
}

window.onload = function () {
    let ball = document.getElementById("ball");
    let line = ball.getContext("2d");

    function init() {
        Width = window.innerWidth;
        height = window.innerHeight;
        ball.width = Width;
        ball.height = height;
        
        lineSize = (Width < height ? Width : height) / 2;
        let color = ["white", "black"]
        document.addEventListener("keydown", function(event) {
            // Verifique se a tecla pressionada foi a tecla "1"
            if (event.key === "1") {
              // Altera o background do elemento body para a primeira cor do array
              line.fillStyle = color[0];
            }
            
            // Verifique se a tecla pressionada foi a tecla "2"
            if (event.key === "2") {
              // Altera o background do elemento body para a segunda cor do array
              line.fillStyle = color[1];
            }
          });
        line.fillRect(0, 0, Width, height);
    }
    init();

    window.onresize = init;

    function Point() {
        this.ang = 2 * PI * random();
        this.dang = (-0.5 + random()) / 10;
        this.ray = 2 * lineSize / 3;
        this.x_axis = Width / 2 + this.ray * cos(this.ang);
        this.y_axis = height / 2 + this.ray * sin(this.ang);

        this.update = function () {
            this.ang += this.dang;
            this.x_axis = Width / 2 + this.ray * cos(this.ang);
            this.y_axis = height / 2 + this.ray * sin(this.ang);
        }
    }

    let ctrls = [];
    for (let i = 0; i < num; i++) {
        ctrls.push(new Point());
    }

    function animate() {
        let typeColor = ['rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.04)']

        document.addEventListener("keydown", function(event) {
            // Verifique se a tecla pressionada foi a tecla "1"
            if (event.key === "1") {
              // Altera o background do elemento body para a primeira cor do array
              line.fillStyle = typeColor[0];
            }
            
            // Verifique se a tecla pressionada foi a tecla "2"
            if (event.key === "2") {
              // Altera o background do elemento body para a segunda cor do array
              line.fillStyle = typeColor[1];
            }
          });
        line.fillRect(0, 0, Width, height);
        line.beginPath();
        line.moveTo((ctrls[0].x_axis + ctrls[num - 1].x_axis) / 2, (ctrls[0].y_axis + ctrls[num - 1].y_axis) / 2);

        for (let initialPoint = 0; initialPoint < num; initialPoint++) {
            let regularCoefficient = initialPoint + 1;
            if (regularCoefficient == num) regularCoefficient = 0;

            line.quadraticCurveTo(ctrls[initialPoint].x_axis, ctrls[initialPoint].y_axis, (ctrls[initialPoint].x_axis + ctrls[regularCoefficient].x_axis) / 2, (ctrls[initialPoint].y_axis + ctrls[regularCoefficient].y_axis) / 2);
            ctrls[initialPoint].update();
        }

        line.strokeStyle = `hsl(${round(180 + count)}deg, 100%, 70%)`;
        line.shadowBlur = lineSize * 30 / 432;
        line.shadowColor = `hsl(${round(180 + count)}deg, 100%, 50%)`;
        line.lineWidth = lineSize * 2 / 432;

        line.stroke();
        line.shadowColor = "transparent";
        count += decline;

        if (count >= 170 || count <= 0) decline = -decline;

        window.requestAnimationFrame(animate);
    }
    animate();
}
