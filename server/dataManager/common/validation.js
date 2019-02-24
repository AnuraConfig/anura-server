import configConvertor from '../../configConvertor'

export function validConfigType(data, type, logger) {
    if (!configConvertor.typeDic[type]) logAndThrow(`no such type:  ${type}`, logger)
    if (!configConvertor.isValid(data, type)) logAndThrow(`config is not a valid config from type  ${type}`, logger)
}

export function logAndThrow(message, logger) {
    if (logger)
        if (typeof logger === "object")
            logger.log(message, "error")
        else
            logger(message, "error")
    throw new Error(message)
}