import type {
  Project as ProjectRaw,
  Release as ReleaseRaw,
  Device as DeviceRaw,
  Mqtt as MqttRaw,
  Report as ReportRaw,
  User as UserRaw,
  Deployment as DeploymentRaw,
} from '@prisma/client'

import type { Options } from 'highcharts'

import type { NuxtError } from '#app'

declare global {
  interface HighchartsOptions extends Options {}

  interface Project extends ProjectRaw {}

  interface Release extends ReleaseRaw {}

  interface Device extends DeviceRaw {
    status: 'unregistered' | 'connected' | 'disconnected'
  }

  interface Mqtt extends MqttRaw {}

  interface User extends UserRaw {
    provider: 'default' | 'google' | 'github'
    role: 'user' | 'admin'
  }

  interface Report extends ReportRaw {}

  interface Deployment extends DeploymentRaw {
    release: ReleaseRaw
    status: 'started' | 'failed' | 'succeded'
  }

  interface CommandMessage {
    deviceId: Device['id']
    action: 'command'
    type: 'config' | 'log' | 'restart' | 'update' | 'custom'
    payload: string
    retain: boolean
  }

  interface ReportMessage {
    deviceId: Device['id']
    action: 'report'
    type: 'status' | 'update' | 'custom'
    retain: boolean
    payload: string
  }

  interface LoggingMessage {
    deviceId: Device['id']
    action: 'logs'
    type: 'info' | 'error' | 'warn' | 'success'
    payload: string
    retain: boolean
  }

  type MqttMessage = CommandMessage | LoggingMessage | ReportMessage

  interface ReportCustomMessage {
    type: 'info' | 'error' | 'warn' | 'success'
    subject: string
    body: string
  }

  interface ReportUpdateMessage {
    releaseId: Release['id']
    deploymentId: Deployment['id']
    status: Deployment['status']
  }

  interface FetchError {
    data: NuxtError
  }
}

export {}
