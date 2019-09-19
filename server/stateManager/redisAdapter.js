import redis from 'redis'
import redisAdapter from 'socket.io-redis';


export default function initializeRedisAdapter(io, config) {
  const { port, host, auth_pass } = config
  const pub = redis.createClient(port, host, { auth_pass })
  const sub = redis.createClient(port, host, { auth_pass })
  io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))
}
