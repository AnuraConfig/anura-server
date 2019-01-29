import { config } from '../constants/configs';
import redisAdaptor from 'socket.io-redis';

const REDIS = "REDIS"

export function initializePubsub(io) {
    switch(config.PUB_SUB.TYPE) {
        case(REDIS):
            io.adapter(redisAdaptor(config.PUB_SUB.HOST))
            break
        default:
            break
    }
}