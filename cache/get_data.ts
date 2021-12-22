import client from "./cache"

const getNset = (keyword) => new Promise((resolve, _reject) => client.get('keyword:' + keyword, (_err, data): any => {
  if (_err) throw _err
  if (data) {
    resolve(JSON.parse(data))
  }
  else{
    resolve("")
  }
})
)


export default getNset;

