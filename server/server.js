import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer, gql } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './schemas'
import http from 'http';
import socketIo from 'socket.io';
import { initializeSocket } from './stateManager/scoket'
import stats from './routes/stats'
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
})

const app = express()
const httpServer = http.Server(app)
const io = socketIo(httpServer)
initializeSocket(io)


app.use(bodyParser.json())
app.use('/stats', stats)

//is alive 
app.get('/meaningOfLife', (req, res) => {
  res.send("42")
})

server.applyMiddleware({ app })

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/`)
)