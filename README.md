# ESP Admin

An open source platform to remotely manage ESP microcontrollers for IoT applications. SDK can be found [here](https://github.com/becem-gharbi/esp-admin-sdk).

## ⚠️ Under development

This project is under developement, planning can be found under `Projects` tab. Any contribution you make is greatly appreciated.

## ✔️ Features

- Support for _ESP32_
- Multi-tenant architecture
- Built-in authentication
- User defined MQTT broker
- Remote configuration
- Error reporting via Webhook and Email
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

## 📝 Documentation

Docs can be found [here](https://esp-admin.bg-tech.tn/getting_started)

### Topics

| **Topics**                         | **Retained** | **Sent by** | **Notes**                       |
| ---------------------------------- | ------------ | ----------- | ------------------------------- |
| device/<device_id>/command/config  | true         | Frontend    | Send new variables              |
| device/<device_id>/command/custom  | false        | Frontend    | Send project commands           |
| device/<device_id>/command/log     | false        | Frontend    | Enable/disable logging          |
| device/<device_id>/command/restart | false        | Frontend    | Trigger device restart          |
| device/<device_id>/command/update  | true         | Device      | Trigger new or existing release |
| device/<device_id>/logs            | false        | Device      | Send logs                       |
| device/<device_id>/report/custom   | false        | Device      | Send custom reports             |
| device/<device_id>/report/debug    | false        | Device      | Send logging status             |
| device/<device_id>/report/status   | true         | Device      | Send device status              |
| device/<device_id>/report/update   | false        | Device      | Send update status              |

## License

[MIT License](./LICENSE)
