import * as managerTypes from './managerTypes'
import dotenv from 'dotenv'
dotenv.config();

export const HUMAN_READABLE = process.env.HUMAN_READABLE || false
export const DATA_MANAGER = process.env.DATA_MANAGER || managerTypes.FILE_SYSTEM
export const STORE_LOCATION = process.env.STORE_LOCATION || '/'