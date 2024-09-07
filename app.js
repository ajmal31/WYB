import express from "express"
import http from "http"
import { socketConfig } from "./src/socketIO.js"

const app = express()
const server= http.createServer()
const port = process.env.PORT || 3000


//Invoking socket Exicution function
socketConfig(server)

//server
server.listen(port, (err) => {

    if (err) console.log(`Error occured while listing server`)
    else console.log(`Server Listening on PORT ${port}`)
})



