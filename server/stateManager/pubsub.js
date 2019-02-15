import configManager from '../constants/configs';
import * as pubsubTypes from '../constants/pubsubTypes';
import redisAdaptor from 'socket.io-redis';
const config = configManager.config

export function initializePubsub(io) {
    switch(config.PUB_SUB.TYPE) {
        case(pubsubTypes.REDIS):
            io.adapter(redisAdaptor(config.PUB_SUB.HOST))
            break
        default:
            break
    }
}