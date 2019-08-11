import express from 'express'
import logger from '../utils/logger'

const sendError = (res) => (error) => {
  logger.log({ level: "error", message: error.message })
  res.status(400).send({ error: error.message })
}

export default (getDataManager) => {
  const router = express.Router()

  router.get('/services', (req, res) => {
    getDataManager().getAllEnv()
      .then((data) => res.send(data))
      .catch(sendError(res))
  })

  router.get('/service', (req, res) => {
    const { serviceName, lastConfig = true, raw = false } = req.query
    getDataManager().getService(serviceName, Boolean(raw), Boolean(lastConfig))
      .then((data) => res.send(data))
      .catch(sendError(res))
  })

  router.get('/latest-config', (req, res) => {
    const { serviceName, environment, raw = false } = req.query
    getDataManager().getConfig(serviceName, environment, Boolean(raw))
      .then((data) => res.send(data))
      .catch(sendError(res))
  })

  router.get('/configs', (req, res) => {
    const { serviceName, environment, raw = false } = req.query
    getDataManager().getConfigs(serviceName, environment, Boolean(raw))
      .then((data) => res.send(data))
      .catch(sendError(res))
  })

  router.get('/global-variable', (req, res) => {
    getDataManager().getGlobalVariable()
      .then((data) => res.send(data))
      .catch(sendError(res))
  })


  router.post('/new-service', (req, res) => {
    const Service = req.body
    getDataManager().createService(service)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })

  router.post('/update-all-global-variable', (req, res) => {
    const newGlobalVariable = req.body
    getDataManager().updateGlobalVariable(globalVariable)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })

  router.post('/update-global-variable', (req, res) => {
    const { key, value } = req.body
    getDataManager().updateGlobalSingleVariable(key, value)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })

  router.post('/update-config/:serviceName/:environmentName', (req, res) => {
    const { serviceName, environmentName } = req.params
    const { data, type } = req.body
    getDataManager().updateConfig(serviceName, environmentName, data, type)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })

  router.post('/update-service/:originalName', (req, res) => {
    const { originalName } = req.params
    const { service } = req.body
    getDataManager().updateService(service, originalName)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })

  router.delete('/delete-service/:serviceName', (req, res) => {
    const { serviceName } = req.params
    getDataManager().deleteService(serviceName)
      .then(() => res.send({ success: true }))
      .catch(sendError(res))
  })


  return router
}