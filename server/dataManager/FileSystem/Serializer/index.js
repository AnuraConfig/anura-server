import BasicSerializer from './basicSerializer'

export default function getSerializer(...args) {
    return new BasicSerializer(args)
}