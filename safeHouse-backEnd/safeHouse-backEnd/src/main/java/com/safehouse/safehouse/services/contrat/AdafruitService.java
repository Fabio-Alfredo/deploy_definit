package com.safehouse.safehouse.services.contrat;


import org.eclipse.paho.client.mqttv3.MqttException;

public interface AdafruitService {
    void publishToAdafruit(String feedName, String data) throws MqttException;
}
