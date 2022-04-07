#include <Servo.h>


int incomingBytes;
int numRotations;
int incomingLength;
int counter = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  if(Serial.available() > 0){ // wait for serial event
      incomingBytes = Serial.read();
      while(Serial.available() == 0){ }
      numRotations = Serial.read();
      while(counter < numRotations){ // perform object detection n number of times
        beginScan();
        counter++;
      }
      
      delay(300);
      Serial.print("Recieved from P5JS: ");
      Serial.println(incomingBytes);
  }

  /*
  for(int i = 5; i <= 175; i++){
    delay(30);
    Serial.print(i);
    Serial.print(",");
    Serial.print(15);
    Serial.print(".");  
  } 

  for(int i = 175; i > 5; i--){
    delay(30);
    Serial.print(i);
    Serial.print(",");
    Serial.print(15);
    Serial.print(".");  
  }*/
}

void beginScan(){
  
  for(int i = 5; i <= 175; i++){
    delay(30);
    Serial.print(i);
    Serial.print(",");
    Serial.print(15);
    Serial.print(".");  
  } 

  for(int i = 175; i > 5; i--){
    delay(30);
    Serial.print(i);
    Serial.print(",");
    Serial.print(15);
    Serial.print(".");  
  }
  
}
