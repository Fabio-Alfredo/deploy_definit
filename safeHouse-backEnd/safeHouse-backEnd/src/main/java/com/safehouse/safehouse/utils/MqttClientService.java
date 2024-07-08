package com.safehouse.safehouse.utils;


import jakarta.annotation.PostConstruct;
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

    @PostConstruct
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
        connOpts.setCleanSession(true);
        connOpts.setAutomaticReconnect(true);

        mqttClient.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable cause) {
                System.out.println("Conexión perdida: " + cause.getMessage());
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) {
                System.out.println("Mensaje recibido: " + new String(message.getPayload()));
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {
                System.out.println("Entrega completa");
            }
        });

        try {
            mqttClient.connect(connOpts);
            System.out.println("Conectado al broker MQTT: " + uri);
        } catch (MqttException e) {
            e.printStackTrace();
            System.out.println("Error al conectar al broker MQTT: " + e.getMessage());
            throw e;
        }
    }

    public boolean isConnected() {
        return mqttClient != null && mqttClient.isConnected();
    }

    public void publishMessage(String topic, String message) throws MqttException {
        if (!isConnected()) {
            throw new MqttException(MqttException.REASON_CODE_CLIENT_NOT_CONNECTED);
        }
        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
        mqttMessage.setQos(1);
        mqttClient.publish(topic, mqttMessage);
        System.out.println("Mensaje publicado: " + message + " al topic: " + topic);
    }

    public void disconnect() throws MqttException {
        if (isConnected()) {
            mqttClient.disconnect();
            System.out.println("Desconectado del broker MQTT.");
        }
    }
}