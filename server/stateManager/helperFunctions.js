import { DEFAULT_ROOM, ROOM_ID_PREFIX } from '../constants/constants'

export function getRoomName(serviceId, environment) {
    if (serviceId && environment)
        return `${ROOM_ID_PREFIX}${serviceId}-${environment}`
    else
        return DEFAULT_ROOM
}