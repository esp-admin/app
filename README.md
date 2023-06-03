# ESP Admin
An open source platform to remotly manage ESP microcontrollers for IoT applications. 

## Features
- Supported devices: ESP32
- Multi-tenant architecture
- Authentication via email/password & Oauth providers
- User defined MQTT broker
- Remote configuration
- Error reporting to Bugsnag
- Realtime logging
- Remote software updates
- Database agnostic: MongoDB & SQL
- File storage to S3 compatible storage provider
- Stateless backend for serverless deployment

## Future features
- Integration with CI/CD tools
- Integration with Node RED
- Reporting via Push notifications
- Support for ESP8266 

## Architecture
![architecture](https://pub-52f7e6f21f164b9e9f3f9c2df16ece76.r2.dev/architecture.jpg)

## Components
The platform is composed of the following key components:

1. Projects
 - Are an optional feature meaning it can be omitted.
 - A project represents an ESP firmware and has multiple releases. 
 - Each release is identified by a unique version string in format `v-x.x.x` and has a public download URL.
 - A project has one to many devices

2. Devices
- A device represent an ESP.
- It can be linked to a project for OTA.
 
3. Commands
- Are MQTT messages sent by the Frontend.
- They trigger specific actions on target: `restart`, `config`, `update`, `debug`.

4. Reports
- Are MQTT messages sent by the device.
- They trigger specific actions on the Frontend for data updates `status`, `metadata`.
- They trigger specific actions on the Backend for repoting `error`.

5. Config
 - Are key-value pairs stored on device's non-Volatile storage in encrypted format. 
 - It includes MQTT credentials and SSL certificate, project related variables and custom properties.
 - Refreshed on device boot and on `config` command.

6. Logging
- Are MQTT messages sent by the device to the Frontend.
- Start upon receiving `debug` command on.
- Stop upon receiving `debug` command off.
- Not stored to database.

7. Updates
- Triggered on creating new release from Frontend.
- Store executable to S3 bucket.
- Send `update` command.
