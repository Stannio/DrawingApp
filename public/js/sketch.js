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
    // Start a socket connection to the server
    // Some day we would run this server somewhere else
    socket = io.connect();
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on('mouse',
        // When we receive data
        function(data) {
            // Draw a blue circle
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
    // Draw some white circles
    fill(r,g,b);
    noStroke();
    ellipse(mouseX,mouseY,rad*150,rad*150);
    // Send the mouse coordinates
    sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
    // We are sending!
    // Make a little object with  and y
    var data = {
        rad: rad,
        r: r,
        g: g,
        b: b,
        x: xpos,
        y: ypos
    };

    // Send that object to the socket
    socket.emit('mouse',data);
}