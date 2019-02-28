import { DEFAULT_ROOM, ROOM_ID_PREFIX } from '../constants/constants'

export function getRoomName(serviceName, environment) {
    if (serviceName && environment)
        return `${ROOM_ID_PREFIX}${serviceName}-${environment}`
    else
        return DEFAULT_ROOM
}