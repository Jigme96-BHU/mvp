const uploadDoc = require('./lib/uploadDoc')

const listen = (data) => {
  const from = data.returnValues.station
  const hash = data.returnValues.hash
  console.log(data.event, { from, hash })
}
uploadDoc.events.docAdded()
  .on('data', listen)
  .on('changed', console.log)
  .on('error', console.error)