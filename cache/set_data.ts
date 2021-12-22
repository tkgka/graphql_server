import client from "./cache"

const getNset = (keyword, value) => new Promise((resolve) => client.get('keyword:' + keyword, (_err): any => {
  if (_err) throw _err
  //스크래핑 진행
  client.set('keyword:' + keyword, JSON.stringify(value), 'EX', 60 * 60 * 24 /* 1일 */, (__err, msg) => {
    if (__err) throw __err
    resolve(msg)
  })
}))


export default getNset;

