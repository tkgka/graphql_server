//redis 시작
//brew services start redis 
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1') //연결
//client.auth('[password]') //인증
client.on('error', (err) => {//에러 핸들링
  console.log('redis error ' + err)
})


export default client

