#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX

int number = 1;
int incomingByte = 0; // for incoming serial data

void setup()
{
  // Open serial communications and wait for port to open:
  //Serial.begin(57600);
  Serial.begin(9600, SERIAL_8N1); // send and receive at 9600 baud
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  Serial.println("Goodnight moon!");

}

void loop() // run over and over
{
  
  // loopJustSend()
  // or
  loopReceiveAndSend()

}


void loopJustSend()
{

  Serial.println("A very long String! =>"+ String(number));
  delay(2000); // waits for a second

  //Increment number
  number++;  
}

void loopReceiveAndSend()
{

  if (Serial.available()){

    // read the incoming byte:
    incomingByte = Serial.read();

    Serial.print("I received: ");
    //Serial.println(incomingByte, DEC);
    Serial.println((char)incomingByte);

    delay(1000); // waits for a second
    Serial.flush();
  }
  
}
