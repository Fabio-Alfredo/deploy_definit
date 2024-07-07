package com.safehouse.safehouse.utils;


import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MqttClientService {

    @Value("${mqtt.uri}")
    private String uri;

    @Value("${mqtt.username}")
    private String username;

    @Value("${mqtt.password}")
    private String password;

    private MqttClient mqttClient;

    @Bean
    public void initialize() {
        try {
            connect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void connect() throws MqttException {
        mqttClient = new MqttClient(uri, MqttClient.generateClientId(), new MemoryPersistence());
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setUserName(username);
        connOpts.setPassword(password.toCharArray());
        mqttClient.connect(connOpts);
        System.out.println("Connected to MQTT broker: " + uri);
    }

    public void subscribeToTopic(String topic, IMqttMessageListener messageListener) throws MqttException {
        mqttClient.subscribe(topic, messageListener);
        System.out.println("Subscribed to topic: " + topic);
    }

    public void publishMessage(String topic, String message) throws MqttException {
        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
        mqttMessage.setQos(1);
        mqttClient.publish(topic, mqttMessage);
        System.out.println("Published message: " + message + " to topic: " + topic);
    }

    public void disconnect() throws MqttException {
        mqttClient.disconnect();
        System.out.println("Disconnected from MQTT broker.");
    }
}
