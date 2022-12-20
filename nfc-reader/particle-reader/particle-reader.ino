#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN A2 
#define RST_PIN D2
#define MOSI_PIN MO 
#define MISO_PIN MI
#define SCK_PIN SCK


MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

void setup() {
	Serial.begin(9600);		// Initialize serial communications with the PC
	while (!Serial);		// Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
	SPI.begin();			// Init SPI bus
	mfrc522.PCD_Init();		// Init MFRC522
	mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
	Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}


void loop() {
	// Look for new cards
	if ( ! mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

	// Select one of the cards
	if ( ! mfrc522.PICC_ReadCardSerial()) {
		return;
	}

	
	String content = "";
	for (byte i = 0; i < mfrc522.uid.size; i++) {
        content += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        content += String(mfrc522.uid.uidByte[i], HEX);
    }
    Particle.publish("rfid_scan", content); // call webhook here
}
