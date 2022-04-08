/*
 * HC-SR04 Ultrasonic Sensor script
 * Combined with servo motor to collect time difference between trigger and echo receiver
 * 
 * Use with pathfinder app and serial api to process results in-browser
 * 
 * September 23rd 2021
 * www.github.com/kieranmachale
 */
 
#include <Servo.h> 

// Defines Trig and Echo pins of the Ultrasonic Sensor
const int trigPin = 10;
const int echoPin = 11;
// Variables for the duration and the distance
long duration;
int distance;
// Variables for incoming serial messages
int incomingBytes;
int rotations;
float temp;
float airSpeed;
int counter = 0;

Servo myServo; // Creates a servo object for controlling the servo motor

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600);
  myServo.attach(12); // Defines on which pin is the servo motor attached
}

// Find the speed of sound in air for a given temperature (in celsius)
/*float getSpeedofSound(temp){
  return (331 + (0.61) * temp);  
}*/

void loop() {
  if(Serial.available() > 0){ // wait for serial event
      temp = Serial.read();
      //airSpeed = getSpeedofSound(temp);
      while(Serial.available() == 0){ }
      rotations = Serial.read();
      while(counter < rotations){ // perform object detection n number of times
        doScan();
        counter++;
      }
  }

}

// Function for calculating the distance measured by the Ultrasonic sensor
int calculateDistance(){ 
  
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH); // Reads the echoPin, returns the sound wave travel time in microseconds
  distance= duration*0.034/2;
  return distance;
}

void doScan(){
for(int i=15;i<=165;i++){  
  myServo.write(i);
  delay(30);
  distance = calculateDistance();// Calls a function for calculating the distance measured by the Ultrasonic sensor for each degree
  
  Serial.print(i); // Sends the current degree into the Serial Port
  Serial.print(","); // Sends addition character right next to the previous value needed later in the Processing IDE for indexing
  Serial.print(distance); // Sends the distance value into the Serial Port
  Serial.print("."); // Sends addition character right next to the previous value needed later in the Processing IDE for indexing
  }
  // Repeats the previous lines from 165 to 15 degrees
  for(int i=165;i>15;i--){  
  myServo.write(i);
  delay(30);
  distance = calculateDistance();
  Serial.print(i);
  Serial.print(",");
  Serial.print(distance);
  Serial.print(".");
  }  
}
