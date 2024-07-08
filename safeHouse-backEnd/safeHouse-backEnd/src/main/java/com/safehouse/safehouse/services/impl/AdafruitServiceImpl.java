package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.services.contrat.AdafruitService;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdafruitServiceImpl implements AdafruitService {


    private final IMqttClient mqttClient;


    public AdafruitServiceImpl(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void publish(final String topic, String data) {
        try {
            MqttMessage message = new MqttMessage();
            message.setPayload(data.getBytes());
            message.setQos(0);
            message.setRetained(false);
            mqttClient.publish(topic, message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
