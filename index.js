var mqtt = require('mqtt');

let Service, Characteristic;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory(
		"homebridge-hassio-input_select",
		"hass-input-select",
		HassInputSelect
	)l
};

class HassInputSelect{
	constructor(log, config) {
		this.log = log;
		this.name = config.name || 'hass-input-select';

		this.mqtt_url = config.mqtt.url || '';
		this.mqtt_clientid = config.mqtt.clientid || this.createClientId();
		this.mqtt_username = config.mqtt.username || 'hass-input-select';
		this.mqtt_password = config.mqtt.password || 'password';
		this.mqtt_topic = config.mqtt.topic || 'hass-input-select';
		this.mqtt_options = {
			keepalive: 10,
			clientId: this.mqtt_clientId,
			protocolId: 'MQTT',
			protocolVersion: 4,
			clean: true,
			reconnectPeriod: 1000,
			connectTimeout: 30000,
			will: {
				topic: this.mqtt_will_topic,
				payload: this.mqtt_clientid + " - Disconnected",
				qos: 0,
				retain: false
			},
			username: this.mqtt_username,
			password: this.mqtt_password,
			rejectUnauthorized: false
		};

		this.setupMQTT();
		this.setupHapServices();
	}

	setupHapServices() {
		this.informationService = new Service.AccessoryInformation();
		this.informationService
			.setCharacteristic(Characteristic.Manufacturer, "Tom")
			.setCharacteristic(Characteristic.Model, "HomeAssistant-Input-Select")
			.setCharacteristic(Characteristic.SerialNumber, "HAIS-" + this.name)
			.setCharacteristic(
				Characteristic.FirmwareRevision,
				require('./package.json').version
			);

	}

	setupMQTT() {
                this.mqtt_client = mqtt.connect(this.mqtt_url, this.mqtt_options);
                this.mqtt_client.on('error', function (err) {
                        this.log('MQTT Error: ' + err);
                }.bind(this));
                this.mqtt_client.on('message', this.handleMqttMessage.bind(this));
                this.mqtt_client.on('connect', this.handleMqttConnected.bind(this));
        }

	handleMqttConnected() {
		this.log('MQTT Connected');
		this.mqtt_client.subscribe(this.mqtt_topic, function (err) {
			if (err) {
				this.log('MQTT Sensor Subscription error:' + err);
			} else {
				this.log('MQTT Subscribed');
			}
		}.bind(this));
	}

	handleMqttMessage(topic, message) {
		this.log("MQTT receieved, Topic: " + topic + " message: " + message);
		if (topic == this.mqtt_sensor_topic) {

		} else {
			this.log('MQTT Message error topic: ' + topic + ' message: ' + message);
		}
	}

	getServices() {
		return []
	}
}
