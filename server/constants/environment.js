import managerTypes from './managerTypes'

export const HUMAN_READABLE = process.env.HUMAN_READABLE || false
export const DATA_MANAGER = process.env.DATA_MANAGER || managerTypes.FILE_SYSTEM
export const STORE_LOCATION = process.env.STORE_LOCATION || '/'