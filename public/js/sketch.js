var socket, rSlider, gSlider, bSlider,r,g,b, rad;


function setup() {
    rSlider = createSlider(0, 255, 255);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);

    radSlider = createSlider(0.10, 1, 0.5, 0.01);
    radSlider.position(180, 20);

    createCanvas(1000, 1000);
    background(0);

    socket = io.connect();

    socket.on('mouse',

        function(data) {

            fill(data.r,data.g,data.b);
            noStroke();
            ellipse(data.x, data.y, data.rad*150, data.rad*150);
        }
    );
}

function draw() {
    r = rSlider.value();
    g = gSlider.value();
    b = bSlider.value();
    rad = radSlider.value();
    indicator = document.getElementById('rip');
    indicator.style.transform = 'scale('+ rad +')';
    indicator.style.backgroundColor = 'rgb('+r+','+g+','+b+')'
}

function mouseDragged() {

    fill(r,g,b);
    noStroke();
    ellipse(mouseX,mouseY,rad*150,rad*150);

    sendmouse(mouseX,mouseY);
}


function sendmouse(xpos, ypos) {

    var data = {
        rad: rad,
        r: r,
        g: g,
        b: b,
        x: xpos,
        y: ypos
    };

    socket.emit('mouse',data);
}
