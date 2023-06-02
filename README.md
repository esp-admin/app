# ESP Admin
An open source platform to manage ESP32 microcontrollers for IoT applications. 

## Features
- Multi-tenant architecture
- Authentication via email/password or Oauth providers
- User defined MQTT broker
- Remote configuration
- Error reporting
- Realtime logging
- Remote software updates manually or via CI/CD pipeline
- Database agnostic, MongoDB or SQL
- File storage to S3 compatible storage
- Stateless backend for serverless deployment

## Architecture
![architecture](https://pub-0632a7a592ef490489f3a5bb81a7fd05.r2.dev/img.jpg)

## Components
The platform is composed of the following key components:

1. Projects
 - Projects are an optional feature meaning it can be omitted.
 - A project represents an ESP firmware and has multiple releases. 
 - Each release is identified by a unique version string in format `v-x.x.x` and has a public download URL.
 - A project can be linked to a Github repo for CI/CD integration.
 - A project has one to many devices

2. Devices
- A device represent an ESP32.
- It can be linked to a project for OTA.
 
2. Commands
- Are MQTT messages sent by the Frontend or Backend.
- They trigger specific actions on target: `restart`, `config`, `update`, `debug`

3. Reports
- Are MQTT messages sent by the target.
- They trigger specific actions on the Frontend (update data) or Backend (repoting): `status`, `metadata`, `error`

5. Config
 - Are key-value pairs stored on target's non-Volatile storage in encrypted manner. 
 - It includes MQTT credentials and SSL certificate, project related variables and custom properties.
 - Refreshed on target boot and on `config` command.

5. Logging
- Are MQTT messages sent by the target to the Frontend.
- Not stored to database

7. Updates
- Triggered on creating new release either manually or via CI/CD workflow.
- Store executable to S3 bucket.
- Send `update` command.
