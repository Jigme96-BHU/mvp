const Web3 = require('web3')
const { uploadDoc, web3} = require ('../lib/uploadDoc')

const details = async (hash, blockNumber, event = undefined) => {
  const timestamp = (await web3.eth.getBlock(blockNumber)).timestamp
  const date = (new Date(timestamp * 1000)).toISOString().split('T')[0]
  const events = await uploadDoc.getPastEvents('docAdded', { fromBlock: blockNumber, toBlock: blockNumber })
  if (!event) event = events.find(i => i.returnValues.hash === hash)
  return { date, block: blockNumber }
}


exports.add = async (req, res) => {

  if (req.uploadError || req.file.buffer.length === 0)
    return res.status(400).json({
      success: false,
      message: req.uploadError || 'invalid file data' })

  const hash = Web3.utils.keccak256(req.file.buffer)
  console.log(hash)
  // const blockNumbers = await uploadDoc.methods.validate(hash)
  // console.log(blockNumbers)
  const blockNumber = Number(await uploadDoc.methods.validate(hash).call())
  // blockNumber = 0
  if (blockNumber > 0)
    return res.status(400).json({
      success: false,
      message: 'given image is already part of the blockchain.',
      details: await details(hash, blockNumber)
    })

  try {
    const address = req.body.address || '0xc5a725e5ccb15a2efaca11ffe281851748480670'
    const result = await uploadDoc.methods.add(hash).send({ from: address })
    res.status(201).json({ success: true, details: await details(hash, result.blockNumber, result.event) })
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message || err })
  }

 }