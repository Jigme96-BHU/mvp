const Web3 = require('web3')
const rpcUrl = 'ws://127.0.0.1:7545'
const web3 = new Web3(rpcUrl)
const my_address = '0x8597a2b0dd63cdd99652c7cbf10784fdde5d931f' //default address

const abi = require('../../build/contracts/uploadDoc.json').abi 
const contract_address = '0x93e35d8e1fAe0c99b3bD7b2668212977097adeE0' 

const uploadDoc = new web3.eth.Contract(abi, contract_address, { from: my_address })

module.exports = {uploadDoc,web3}
