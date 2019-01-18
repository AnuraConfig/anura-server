import dataManager from '../../dataManager'

export default function (obj, args) {
    return dataManager.manager.getAllEnv()
}