// This #include statement was automatically added by the Particle IDE.
#include <ArduinoJson.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN A2 
#define RST_PIN D2
#define MOSI_PIN MO 
#define MISO_PIN MI
#define SCK_PIN SCK


int led1 = A0; // Success LED
int led2 = A1; // Failure LED


MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance


void setup() {
	pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    
	// Subscribe to the integration response event
    Particle.subscribe("hook-response/reader_scan", successHandler);
    Particle.subscribe("hook-error/reader_scan", failureHandler);
    
	mfrc522.PCD_Init();
}


void successHandler(const char *event, const char *data) {
  digitalWrite(led1, HIGH);
  delay(1000);
  digitalWrite(led1, LOW);
  delay(1000);
}

void failureHandler(const char *event, const char *data) {
  digitalWrite(led2, HIGH);
  delay(1000);
  digitalWrite(led2, LOW);
  delay(1000);
}


void loop() {
	// Look for new cards
	if (!mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

	// Select one of the cards
	if (!mfrc522.PICC_ReadCardSerial()) {
		return;
	}

	
	String serial_number = "";
	for (byte i = 0; i < mfrc522.uid.size; i++) {
        serial_number += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        serial_number += String(mfrc522.uid.uidByte[i], HEX);
    }
    
    Particle.publish("reader_scan", serial_number, PRIVATE); 
    delay(3000);
}