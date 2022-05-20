song="";
scoreleftwrist=0;
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;

    function preload() {
    song=loadSound("music.mp3");
}

function setup() {
  canvas=createCanvas(600,500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();

  posenet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
}

function draw() {
 image(video,0,0,600,500);
 fill('blue');
 stroke('voilet');

 if (scoreleftwrist>0.2) {
  circle(leftwristX,leftwristY,30);
  innumberleftwrist=Number(leftwristY);
  remove_decimal=floor(innumberleftwrist);
  volume=remove_decimal/500;
  document.getElementById("volume").innerHTML="volume=" + volume;
  song.setVolume(volume);
 }

}

function play() {
  song.play(); 
  song.setVolume(1);
  song.rate(1);
}

function gotPoses(results) {
  if (results.length>0) {
    console.log(results);
    leftwristX=results[0].pose.leftwrist.x;
    rightwristX=results[0].pose.rightwrist.x;
    leftwristY=results[0].pose.leftwrist.y;
    rightwristY=results[0].pose.rightwrist.y;
    scoreleftwrist=results[0].pose.keypoints[9].score;

  }
}

function modelLoaded() {
  console.log('modelLoaded');
}