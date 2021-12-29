//redis 시작
//brew services start redis 
import env from '../env';
const redis = require('redis')
const client = redis.createClient(6379, env.redis_host) //연결
//client.auth(env.redis_pw) //인증
client.on('error', (err) => {//에러 핸들링
  console.log('redis error ' + err)
})


export default client

