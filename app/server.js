const ganache = require('ganache-cli')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('hbs')

const app_port = process.env.PORT || 4000
const eth_port = process.env.ETH_PORT || 7545
const network_id = process.env.NETWORK_ID || 5777
let blockchain


const ganacheServer = ganache.server({
    deterministic: true,
    mnemonic: 'buzz carbon minute major tackle price green dutch latin window extend happiness',
    db_path: __dirname + '/db',
    network_id
})

ganacheServer.listen(eth_port, (err, chain) => {
    if (err) return console.error(err)
    blockchain = chain
    console.log(Object.keys(blockchain.accounts))
  })

const app = express()
const server = require('http').createServer(app)

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// app.use(express.urlencoded({extended:true}));
//Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.set('json spaces', 4)



app.set('view engine', 'hbs');

  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//define routes
app.use('/', require('./routes/pages'));

server.listen(app_port,_ => console.log(`Application server listening on ${app_port}`))