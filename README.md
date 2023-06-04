# ESP Admin

An open source platform to remotely manage ESP microcontrollers for IoT applications.

## ⚠️ Under development

This project is under developement, planning can be found under `Projects` tab. Any contribution you make is highly appreciated.

## ✔️ Features

- Supported devices *ESP32*
- Multi-tenant architecture
- Built-in authentication
- User defined MQTT broker
- Remote configuration
- Error reporting via Webhook and Bugsnag
- Realtime logging
- Remote software updates
- Database agnostic (Prisma based)
- File storage to S3 compatible storage provider
- Stateless backend for serverless deployment

## ⌛ Future features

- Integration with Github Actions for automated releases
- Integration with Node RED for handling apps logic
- Reporting via Firebase Cloud Messaging
- Support for *ESP8266*

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

## License

[MIT License](./LICENSE)
