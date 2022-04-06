const bodyParser = require('body-parser')
const Web3 = require('web3')
const { uploadDoc, web3} = require ('../lib/uploadDoc')
const express = require('express')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const details = async (hash, blockNumber, event = undefined) => {
  const timestamp = (await web3.eth.getBlock(blockNumber)).timestamp
  const date = (new Date(timestamp * 1000)).toISOString().split('T')[0]
  const events = await uploadDoc.getPastEvents('docAdded', { fromBlock: blockNumber, toBlock: blockNumber })
  console.log(events);
  if (!event) event = events.find(i => i.returnValues.hash === hash)
    // const address = event.returnValues.station
  return { hash, date, block: blockNumber}
}

exports.add = async (req, res) => {

  if (req.uploadError)
    return res.status(400).json({
      success: false,
      message: req.uploadError || 'invalid file data' })

  const file = req.files
  
  if (file.file1 === undefined || file.file2 === undefined || file.file3 === undefined || file.file4 === undefined || file.file5 === undefined )
    return res.status(400).json({
        success: false,
        message: 'Please upload all the file'
    })

  let detail = [];
  for(var i = 1; i <= 5; i++){
    const address = req.body.address || '0xc5a725e5ccb15a2efaca11ffe281851748480670'
    let filename = "file"+i;
    let buffer= file[filename][0].buffer
    const hash = Web3.utils.keccak256(buffer)
    // const blockNumber = Number(await uploadDoc.methods.validate(hash).call())
    //   if (blockNumber > 0)
    //     return res.status(400).json({
    //       success: false,
    //       message: 'given image is already part of the blockchain.',
    //       details: await details(hash, blockNumber)
    //     })
    const result = await uploadDoc.methods.add(hash).send({ from: address })
    detail[i-1] = await details(hash, result.blockNumber, result.event) 
  }

  try {
    res.status(201).json({ success: true, details: detail })
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message || err })
  }
 }
 


 exports.val = async (req, res) => {

  // if (req.uploadError || req.file.buffer.length === 0)
  //   return res.status(400).json({
  //     success: false,
  //     message: req.uploadError || 'invalid file data' })

  const file = req.files
  console.log(file.file1[0].buffer.length)
  res.send("success")

  // const hash = Web3.utils.keccak256(req.file.buffer)
  
  // console.log(hash)

  // // const blockNumber = Number(await uploadDoc.methods.validate(hash).call())
  // blockNumber = 0
  // if (blockNumber > 0)
  //   return res.status(400).json({
  //     success: false,
  //     message: 'given image is already part of the blockchain.',
  //     details: await details(hash, blockNumber)
  //   })

  // try {
  //   const address = req.body.address || '0xc5a725e5ccb15a2efaca11ffe281851748480670'
  //   const result = await uploadDoc.methods.add(hash).send({ from: address })
  //   res.status(201).json({ success: true, details: await details(hash, result.blockNumber, result.event) })
  // } catch (err) {
  //   return res.status(400).json({ success: false, message: err.message || err })
  // }

 }
 