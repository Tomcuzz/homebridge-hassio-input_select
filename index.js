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
	}

	getServices() {
		return []
	}
}
