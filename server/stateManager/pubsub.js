import configManager from '../constants/configs';
import * as pubsubTypes from '../constants/pubsubTypes';
import redisAdaptor from 'socket.io-redis';

export function initializePubsub(io) {
    switch(configManager.config.PUB_SUB.TYPE) {
        case(pubsubTypes.REDIS):
            io.adapter(redisAdaptor(configManager.config.PUB_SUB.HOST))
            break
        default:
            break
    }
}