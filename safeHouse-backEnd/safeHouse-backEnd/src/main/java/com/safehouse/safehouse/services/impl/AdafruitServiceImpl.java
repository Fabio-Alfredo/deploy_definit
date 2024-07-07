package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.services.contrat.AdafruitService;
import com.safehouse.safehouse.utils.MqttClientService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdafruitServiceImpl implements AdafruitService {

    private final MqttClientService mqttClientService;

    @Value("${mqtt.username}")
    private String username;

    public AdafruitServiceImpl(MqttClientService mqttClientService) {
        this.mqttClientService = mqttClientService;
    }

    public void publishToAdafruit(String feedName, String data) throws MqttException {
        String topic = username + "/feeds/" + feedName;
        mqttClientService.publishMessage(topic, data);
        System.out.println("Publicado en el feed '" + feedName + "' de Adafruit IO: " + data);
    }
}
