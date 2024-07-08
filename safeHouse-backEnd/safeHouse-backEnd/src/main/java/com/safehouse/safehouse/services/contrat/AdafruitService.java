package com.safehouse.safehouse.services.contrat;


import org.eclipse.paho.client.mqttv3.MqttException;

public interface AdafruitService {
    void publish(final String topic, String data);
}

