/*
 * HC-SR04 Ultrasonic Sensor script
 * Combined with servo motor to collect time difference between trigger and echo receiver
 * 
 * Use with read-serial.py to write comma seperated values to CSV file
 * 
 * September 23rd 2021
 * www.github.com/kieranmachale
 */

#include <HCSR04.h>

#define FREQUENCY 300
#define BAUD 9600

// Setting the digital I/O pins on the arduino board
byte trigPin = 8;
byte echoPin = 9;
int LED = 8;
int index = 1;
int angle = 1;

// CSV headers
String header1 = "Index";
String header2 = "Measurement in cm";
String header3 = "Angle in Degrees";

// Used to create CSV headers
bool headers = true;

void setup () {
  // Runs once at beginning of execution
  Serial.begin(BAUD);
  HCSR04.begin(trigPin, echoPin);
  clearSerialMonitor();
  pinMode(LED, OUTPUT);
}

void loop () {

  while(headers){
    Serial.print(header1);
    Serial.print(",");
    Serial.print(header2);
    Serial.print(",");
    Serial.println(header3);
    headers = false;
  }
  
  double* distances = HCSR04.measureDistanceCm();
  
  // Printing data to serial monitor
  Serial.print(index);
  Serial.print(",\t\t");
  Serial.print((int)distances[0]);
  Serial.print("cm");
  Serial.print(",\t\t");
  Serial.println(angle);

  index += 1;
  angle += 4;
  
  delay(FREQUENCY);

  // TODO: Write data from serial monitor to CSV file
  if((int)distances[0] < 8){
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  
}

void clearSerialMonitor(){
  for(int i = 0; i < 80; i++){
    Serial.println("");
  }
}
