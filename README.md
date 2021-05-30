# homebridge-hassio-input_select
A simple package to bridge input_select's from Home Assistant to Homekit using HomeBridge

   * [Installation](#installation)
   * [Configuration](#configuration)
   * [Release Notes](#release-notes)

# Installation
Follow the instructions in [homebridge](https://www.npmjs.com/package/homebridge) for the homebridge server installation.
This plugin is published through [NPM](https://www.npmjs.com/package/homebridge-hassio-input_select) and should be installed "globally" by typing:

    npm install -g homebridge-tasmota-sonoff-thermostat

# Configuration
An example configuration for HomeBridge is below:

```javascript
{
  "accessory": "HassInputSelect",
  "name": "Hass Input Select",
  "values": [
    "Input1",
    "Input2"
  ],
  "mqtt": {
    "url": "mqtt://192.168.1.2:1883",
    "clientid": "clinetid",
    "username": "username",
    "password": "password",
    "topic": "publish/topic/in/mqtt"
  }
}
```

The following configuration will bridge an input select into mqtt:
```yaml
TBC
```

# Release Notes
## Roadmap:
- Fully Test
- Write Tests
