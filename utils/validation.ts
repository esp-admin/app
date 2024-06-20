export const REGEX_ID = /(^[a-fA-F0-9]{24}$)|(^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$)|(^c.{24}$)/
export const REGEX_SPACE_AROUND = /^\s|\s$/
export const REGEX_SPACE = /\s/
export const REGEX_VERSION = /^(\d+)\.(\d+)\.(\d+)(?:-([\w-.]+))?(?:\+([\w-.]+))?$/
export const REGEX_URL_WSS = /^wss/
export const REGEX_URL_MQTTS = /^mqtts/
export const REGEX_PASSWORD = /(?=.*[a-z])(?=.*[0-9])(?=.{6,})/

export const ERROR_REQUIRED = 'Please fill out this field'
export const ERROR_NO_SPACE = 'Should not contain spaces'
export const ERROR_NO_SPACE_AROUND = 'Should not start or end with spaces'
export const ERROR_EXISTS = 'This value is already used'
export const ERROR_INVALID_JSON = 'Should be a valid JSON'
export const ERROR_INVALID_VERSION = 'Should be in format x.y.z or x.y.z-suffix'
export const ERROR_INVALID_EMAIL = 'Should be a valid email'
export const ERROR_INVALID_URL = 'Should be a valid url'
export const ERROR_INVALID_PASSWORD = 'At least 6 characters, 1 lowercase, 1 number'
export const ERROR_UPLOAD_SIZE = 'File size should not exceed 5MB'
export const ERROR_UPLOAD_FAILED = 'File upload failed'
export const ERROR_MATCH_PASSWORD = 'Passwords do not match'
