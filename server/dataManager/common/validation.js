import configConvertor from '../../configConvertor'

export function validConfigType(data, type) {
    if (!configConvertor.typeDic[type]) throw new Error(`no such type:  ${type}`)
    if (!configConvertor.isValid(data, type)) throw new Error(`config is not a valid config from type  ${type}`)
}
