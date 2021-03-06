// Declaring variables for radar graphic
let iDistance, iAngle;
let serial;
let currentString;
let latestData = "waiting for data";
let myArray;
let outByte;
// Retrieving user configurations
let numRotations = localStorage.getItem("currentRotations");
let objectLength = localStorage.getItem("objectLength");
let temp = localStorage.getItem("currentTemp");

var myPromise = new Promise(function(resolve, reject){
    // wait for 3 seconds...
  setTimeout(resolve, 3000)
});

async function setup() {
  var myCanvas = createCanvas(640, 400);
  myCanvas.parent("sketch-box");
  smooth();
  serial = new p5.SerialPort();

  serial.on('connected', serverConnected);
  serial.on('data', gotData);
  serial.on('open', gotOpen);
  serial.on('close', portClose);

  serial.open('/dev/tty.usbmodem1411');
  await myPromise; // Must wait while the Arduino restarts

  outByte = int(temp);
  serial.write(outByte);
  await myPromise;
  serial.write(parseInt(numRotations)); // number of rotations of the motor

  //doWrite();

}

function serverConnected() {
    //mytext.innerHTML += "<p class='open'>[Connection Opened...]</p>";
    document.querySelector(".sketch-info").innerHTML="[Server connected...]";
}

function gotOpen(){
  document.querySelector(".sketch-info").innerHTML+="<br><p style='color:white'>[Serial port opened!]</p>";
}

function portClose(){
  //mytext.innerHTML += "<p class='close'>[Connection Closed...]</p>"
  document.querySelector(".sketch-info").innerHTML+="<p class='closed'>[Port closed...]</p>";
  
}

function gotData(){
    currentString = serial.readStringUntil(".");
    //console.log(currentString);
    myArray = currentString.split(",");
    iAngle = parseInt(myArray[0]);
    iDistance = parseInt(myArray[1]);
    objectLength = 40;
    //let num = 1 + parseInt(myArray[0]);
    /*if(iAngle){
      console.log(iAngle);
    }*/
}

function draw() { 
  fill(98,245,31);
  noStroke();
  fill(0,4);
  rect(0, 0, 500, 282); 

  fill(98,245,31);

  drawRadar();
  drawLine();
  drawObject();
  drawText();
  
}

function drawRadar(){

  push();
  translate(244,252);
  noFill();
  strokeWeight(2);
  stroke(98,245,31);

  arc(0,0,450,450,PI,TWO_PI);
  arc(0,0,350,350,PI,TWO_PI);
  arc(0,0,250,250,PI,TWO_PI);
  arc(0,0,150,150,PI,TWO_PI);

  line(-240,0,240,0);
  line(0,0,-240*cos(radians(30)),-240*sin(radians(30)));
  line(0,0,-240*cos(radians(60)),-240*sin(radians(60)));
  line(0,0,-240*cos(radians(90)),-240*sin(radians(90)));
  line(0,0,-240*cos(radians(120)),-240*sin(radians(120)));
  line(0,0,-240*cos(radians(150)),-240*sin(radians(150)));
  line(-240*cos(radians(30)),0,240,0);
  pop();
}

function drawLine() {
  push();
  strokeWeight(9);
  stroke(30,250,60);
  translate(240,252); // moves the starting coordinats to new location
  line(0,0,230*cos(radians(iAngle)),-230*sin(radians(iAngle))); // draws the line according to the angle
  pop();
}

function drawObject() {
  push();
  translate(240,252); // moves the starting coordinats to new location
  strokeWeight(9);
  stroke(255,10,10); // red color
  pixsDistance = iDistance*5.625; // covers the distance from the sensor from cm to pixels
  // limiting the range to 400 cms
  if(iDistance<objectLength){
    // draws the object according to the angle and dimensions specified by the user
  //document.querySelector(".sketch-info").innerHTML+="<p class='object'>[OBJECT DETECTED]</p>";
  line(pixsDistance*cos(radians(iAngle)),-pixsDistance*sin(radians(iAngle)),238*cos(radians(iAngle)),-238*sin(radians(iAngle)));
  }
  pop();
}

function drawText() { // draws the texts on the screen
  
  push();
  
  fill(0,0,0);
  noStroke();
  //rect(0, 1010, 2650, 540);
  fill(98,245,31);
  textSize(10);
  text("100cm",285,247);
  text("200cm",335,247);
  text("300cm",385,247);
  text("400cm",435,247);
  textSize(14);

  
  text("Object: ", 10, 20);
  if(iAngle){
    text("Angle: " + iAngle +" ", 10, 40);
  }
  
  text("Distance: ", 10, 60);
  
  /*
  text("Object: ", 40, 40);
  text("Angle: ", 40, 80);
  text("Distance: ", 40, 120);*/
  

  
  textSize(15);
  fill(98,245,60);
  translate(245+244*cos(radians(30)),265-288*sin(radians(30)));
  rotate(-radians(-65));
  text("30\u00B0",0,0);
  resetMatrix();

  
  translate(240+244*cos(radians(60)),245-244*sin(radians(60)));
  rotate(-radians(-32));
  text("60\u00B0",0,0);
  resetMatrix();
  /*
  translate(945+960*cos(radians(90)),990-960*sin(radians(90)));
  rotate(radians(0));
  text("90",0,0);
  resetMatrix();
  translate(935+960*cos(radians(120)),1003-960*sin(radians(120)));
  rotate(radians(-30));
  text("120",0,0);
  resetMatrix();
  translate(940+960*cos(radians(150)),1018-960*sin(radians(150)));
  rotate(radians(-60));
  text("150",0,0);
  */
  pop(); 
  
}

var synchroniseDelay = new Promise(function(resolve, reject){
  // wait for 30 milliseconds...
setTimeout(resolve, 30)
});