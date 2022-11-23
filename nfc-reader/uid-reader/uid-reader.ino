/*
 * Resources: 
 *  - DumpInfo example
 *  - https://www.viralsciencecreativity.com/post/arduino-rfid-sensor-mfrc522-tutorial
 *  - https://github.com/KhoiUna/cis430-iot/blob/main/bmp-sensor/temperature_sensor/temperature_sensor.ino
 */

#include <SPI.h>
#include <MFRC522.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid     = "Khoi";
const char* password = "khoi12345!";

// REPLACE with your Domain name and URL path or IP address with path
String serverName = "http://172.20.10.7:3000/api/reader";

// Keep this API Key value to be compatible with the PHP code provided in the project page. 
// If you change the apiKeyValue value, the PHP file /post-esp-data.php also needs to have the same key 
String apiKeyValue = "tPmAT5Ab3j7F9";


#define RST_PIN         22       // Configurable, see typical pin layout
#define SS_PIN          21       // Configurable, see typical pin layout

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

void setup() {
	Serial.begin(115200);		// Initialize serial communications with the PC
	while (!Serial);		// Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
	SPI.begin();			// Init SPI bus
	mfrc522.PCD_Init();		// Init MFRC522
	delay(4);				// Optional delay. Some board do need more time after init to be ready, see Readme
	mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
	Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() {
	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if ( ! mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

	// Select one of the cards
	if ( ! mfrc522.PICC_ReadCardSerial()) {
		return;
	}

  // Show UID on serial monitor
  Serial.print("UID tag: ");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  Serial.println(content.substring(1));

  if(WiFi.status()== WL_CONNECTED and content){
    WiFiClient client;
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
    
    // Specify content-type header
//    http.addHeader("Content-Type", "application/json");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    Serial.print("UID tag exists: ");    
    Serial.println(content);
    
    // Prepare your HTTP POST request data
    String postData = "card_serial_id=" + content;

    // Send HTTP POST request
    int httpResponseCode = http.POST(postData);
     
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      StaticJsonDocument<64> doc;
      DeserializationError deserializeError = deserializeJson(doc, payload);
      if (deserializeError) {
        Serial.print("deserializeJson() failed: ");
        Serial.println(deserializeError.c_str());
        return;
      }
      
      bool success = doc["success"]; // true
      bool error = doc["error"]; // false
      // TODO: turn on LED
      Serial.println("--Response--");
      Serial.print("Success: ");
      Serial.println(success);
      Serial.print("Error: ");
      Serial.println(error);
      Serial.println("--Response ends--");
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}
