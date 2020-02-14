#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include "FirebaseESP8266.h"
#include <NTPClient.h>
#include <WiFiUdp.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor (D4)
#define DHTTYPE    DHT22     // DHT 22 (AM2302)
DHT dht(DHTPIN, DHTTYPE);

#define NTP_ADDRESS  "europe.pool.ntp.org"
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_ADDRESS, 0, 1000);

FirebaseData firebaseData;
FirebaseJson json;


#define WIFISSID "BELLWIFI@MCDONALDS"
#define WIFIPWD "bigChungus"
#define FIREBASE_HOST "lawnhacks-ca353.firebaseio.com" //no http:// or https:// or slash at beginning or at the end
#define FIREBASE_AUTH "F50ldKpZof9nIPDYDhriXUAN9pC6mH4N3qAZ8vPN"
String fbUid = "BTdKUqTj03XFgji3yOiKoQMokPG2";

// Set delay between sensor readings
uint32_t delayMS = 10000;

void connectWifi(){
  WiFi.begin(WIFISSID, WIFIPWD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println(".......");
  Serial.println("WiFi Connected....IP Address:");
  Serial.println(WiFi.localIP());
}

void readFb(){
//  if (Firebase.getInt(firebaseData, "/red")) {
//   if  (firebaseData.dataType() == "int") {
//      int val = firebaseData.intData();
//      if (val != redValue) {
//        redValue = val;
//        setLedColor();
//      }
//    }
//  }
}

void writeFb(double temp, double humid){
  timeClient.update();
  String epcohTime =  String(timeClient.getEpochTime());
  
  json.clear();
  json.set("temperature", temp);
  json.set("humidity", humid);
  
  if (Firebase.set(firebaseData, "/users/" + fbUid + "/sensors/" + epcohTime, json)){
      Serial.println("WRITE PASSED");
      Serial.println("PATH: " + firebaseData.dataPath());
      Serial.println("TYPE: " + firebaseData.dataType());
      Serial.println("ETag: " + firebaseData.ETag());
      Serial.println("------------------------------------");
      Serial.println();
  } else {
      Serial.println("WRITE FAILED");
      Serial.println("REASON: " + firebaseData.errorReason());
      Serial.println("------------------------------------");
      Serial.println();
  }
}

void setup() {
  Serial.begin(9600);
  
  // Set up networking
  connectWifi();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Serial.println("Firebase initialized");
  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "small");

  //Set timezone
  timeClient.begin();
  
  // Initialize sensors
  dht.begin();
  Serial.println("Sensors initialized");
  
}

void loop() {
  // Delay between measurements.
  delay(delayMS);
  // Get temperature event and print its value.
  double h = dht.readHumidity();
  double t = dht.readTemperature();
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print("%  Temperature: ");
  Serial.print(t);
  Serial.println("°C ");

  writeFb(t, h);
}
