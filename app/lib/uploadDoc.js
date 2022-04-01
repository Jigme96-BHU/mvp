const Web3 = require('web3')
const rpcUrl = 'ws://127.0.0.1:7545'
const web3 = new Web3(rpcUrl)
const my_address = '0x3D3646d2863eE6daeF2FaFC014492Ba0f9a4C24f' //default address

const abi = require('../../build/contracts/uploadDoc.json').abi 
const contract_address = '0x4d7aC600Baca5411F677Ac3a5465De54dA765B23' 

const uploadDoc = new web3.eth.Contract(abi, contract_address, { from: my_address })

module.exports = {uploadDoc,web3}
