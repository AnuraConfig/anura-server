import configManager from '../constants/configs'
import * as pubsubTypes from '../constants/pubsubTypes'
import { initializeRedisAdapter } from './redisAdapter'


export function initializePubsub(io) {
    if (!configManager.config.PUB_SUB.TYPE) return
    switch (configManager.config.PUB_SUB.TYPE.toLowerCase()) {
        case (pubsubTypes.REDIS):
            initializeRedisAdapter(io, config)
            break
        default:
            break
    }
}