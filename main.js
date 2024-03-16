noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    
    canvas = createCanvas(550, 550);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Inittialized!');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.noseX;
        noseY = results[0].pose.noseY;
        console.log("noseX = " + noseX +" noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "difference =" + difference);
    }
}

function draw() {
    background('#969A97');

    let squareX = noseX - difference / 2;
    let squareY = noseY - difference / 2;

    fill('#F90093');
    stroke('F90093');
    square(noseX, noseY, difference);
    
    document.getElementById("square_side").innerHTML = "Largura e altura serão = " + difference + "px";
}