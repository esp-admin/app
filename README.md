# ESP Admin

An open source platform to remotely manage ESP microcontrollers for IoT applications.

## ⚠️ Under development

This project is under developement, planning can be found under `Projects` tab. Any contribution you make is highly appreciated.

## ✔️ Features

- Supported devices _ESP32_
- Multi-tenant architecture
- Built-in authentication
- User defined MQTT broker
- Remote configuration
- Error reporting via Webhook and Bugsnag
- Realtime logging
- Remote software updates
- Database agnostic (Prisma based)
- File storage to S3 compatible storage provider
- Serverless deployment

## ⌛ Future features

- Integration with Github Actions for automated releases
- Integration with Node RED for handling apps logic
- Reporting via Firebase Cloud Messaging
- Support for _ESP8266_

## 🛠️ Frameworks & Tools

- Nuxt 3 for Fullstack web development
- NaiveUI & TailwindCSS for UI styling
- Figma for UI design
- PlatformIO as firmware IDE
- Arduino as firmware framework

## 🧱 Architecture

![architecture](https://pub-52f7e6f21f164b9e9f3f9c2df16ece76.r2.dev/architecture.jpg)

This is based on an initial conceptual design

1. Projects

- A project represents an ESP firmware and has multiple releases.
- Each release is identified by a unique version string in format `v-x.x.x` and has a public download URL.
- A project has one to many devices.

2. Devices

- A device represent an ESP microcontroller.
- It can be linked to a project for OTA.

3. Commands

- Are MQTT messages sent by the Frontend.
- They trigger specific actions on device: `restart`, `config`, `update`, `debug`.

4. Reports

- Are MQTT messages sent by the device.
- They trigger specific actions on the Frontend for data updates `status`, `metadata`.
- They trigger specific actions on the Backend for reporting `error`.

5. Config

- Are key-value pairs stored on device's non-Volatile storage in encrypted format.
- It includes MQTT credentials and SSL certificate, project related variables and custom properties.
- Refreshed on device boot and on `config` command.

6. Logging

- Are MQTT messages sent by the device to the Frontend can be of type `info`, `error`, `warn`, `success`.
- Start upon receiving `debug` command on.
- Stop upon receiving `debug` command off.
- Not stored to database.

7. Updates

- Triggered on creating new project release from Frontend.
- Store executable to S3 bucket.
- Send `update` command.

## 📩 Flows

### General

- All REST API calls initiated by the device must be done on `/device/<device_id>` path with API key as authorization header
- All mqtt topics must be prefixed with `/device/<device_id>`
- The mqtt client_id of the device is equals to the device_id
- Commands are mqtt messages sent by the Frontend to `/command` topic
- Reports are mqtt messages sent by the device on `/report` topic
  and REST API calls made to _[POST] `/report`_ endpoint (at the same time)

### Add mqtt settings

- Mqtt broker is defined by the user for security and scalability considerations
- The user should have a running mqtt broker with support for websockets with version 3.1 or 3.1.1, it's recommended to be a secure connection
- If the connection is secured, the user should enter the CA certificate
- The user enters the websockets URI of the broker. This is required for the Frontend to connect to the broker
- The user can enter the raw mqtt connection URI of the broker.This is used by the device as the main broker uri. If not defined the websockets uri will be used
- The user enters username/password. These are secrets that permits the connection to the broker
- On boot the device calls _[GET] `/settings`_ endpoint to collect mqtt settings

### Create new project

- Assign a unique name

### Create new device

- Assign a unique name
- Enter the device's MAC, should be displayed via serial terminal on device boot
- Assign an API key. This is a secret used for authorization in REST API calls to the Backend

### Add variables

- Variables are key-value pairs added on a project scope.

### Assign variables

- Variables are assigned on device scope. The device should be linked to a project where the variables were added
- On variables update a `config` command is sent (retained message)

### Add commands

- Commands are key-value pairs added on project scope

### Run commands

- Commands are run on device scope. The device should be linked to a project where the commands were added.
- On command click a `<key>` command is sent with the value as payload

### Logging

- Logs are mqtt messages sent by the device on topic `/logs`
- Logging is enabled/disabled upon opening/closing realtime tab.
- When realtime opens, a `debug` command is sent with payload `on` and `off` otherwise
- On message receive the device should activate/desactivate logging and send `debug` report back (retained message)

### Status update

- The status of the device can be _connected_, _disconnected_ or _unregistered_
- Upon status change the device or borker (last will) should sends a `status` report
- The Frontend then updates the status property of the device

### Create release

- Releases are created on project scope with a unique version.
- The executable is uploaded to an S3 bucket.
- Upon release, an `update` command is sent to all linked devices with version, projectId and downloadUrl as payload (retained message)
- The device(s) checks the version and projectId
- On deployment change the device sends `update` report

### Trigger release

- Existing releases can be triggered for rollback. The flow is the same as Create release without inputs.

### Summary

| **Topics**                          | **Retained** | **Sent by** | **Notes**                       |
| ----------------------------------- | ------------ | ----------- | ------------------------------- |
| /device/<device_id>/command/config  | true         | Frontend    | Send new variables              |
| /device/<device_id>/command/<key>   | false        | Frontend    | Send project commands           |
| /device/<device_id>/command/debug   | false        | Frontend    | Enable/disable logging          |
| /device/<device_id>/command/restart | false        | Frontend    | Trigger device restart          |
| /device/<device_id>/command/update  | true         | Device      | Trigger new or existing release |
| /device/<device_id>/logs            | false        | Device      | Send logs                       |
| /device/<device_id>/report/debug    | false        | Device      | Send logging status             |
| /device/<device_id>/report/status   | true         | Device      | Send device status              |
| /device/<device_id>/report/update   | false        | Device      | Send update status              |

## License

[MIT License](./LICENSE)
