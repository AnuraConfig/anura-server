import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './schemas'
import http from 'http';
import cors from 'cors';
import socketIo from 'socket.io';
import { initializeSocket } from './stateManager/socket'
import stats from './routes/stats'
import { loadConfig } from './constants/configs'
import dataManager from './dataManager/index'
import devArguments from './devArguments'
import path from 'path'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  dataSources: () => dataManager.getDataManager()
})

const app = express()
const httpServer = http.Server(app)
const io = socketIo(httpServer)

initializeSocket(io)

app.use(express.static(path.join(__dirname, '../build')))

app.use(cors())
app.use(bodyParser.json())
app.use('/stats', stats)

//is alive 
app.get('/meaningOfLife', (req, res) => {
  console.log('ping')
  res.send("42")
})

server.applyMiddleware({ app })

function startServer(configs) {
  const config = loadConfig(configs)
  dataManager.initializeDataManager()
  httpServer.listen({ port: config.SERVER_PORT, hostname: config.HOST_NAME }, () =>
    console.log(`🚀 Server ready at http://${config.HOST_NAME}:${config.SERVER_PORT}/`)
  )
}
if (process.env.NODE_ENV !== "production")
  startServer(devArguments)

exports.startServer = startServer
