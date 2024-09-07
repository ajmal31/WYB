import { Server } from "socket.io"
import redis from "redis"

export async function socketConfig(httpServer) {

    const MAX_CONNECTIONS = 3
    const CONNECTION_TIMEOUT = 60000 * 3 // 3 Minutes
    const connectionDataClearTime = 60000 * 60 // 1 Hour
    const connectedClients = new Map()
    const redisClient = redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })

    try {

        const response = await redisClient.connect()
        console.warn(`Redis connection success `)
    } catch (error) {
        console.warn(`Error occured while connectig redis ${error}`)
    }

    setInterval(() => {
        if (connectedClients.size !== 0) connectedClients.clear()
    }, connectionDataClearTime)

    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    })
    io.on("connection", (socket) => {

        const clientIp = socket?.handshake?.address
        let currentConnections = connectedClients.get(clientIp) || 0

        redisClient.incr("totalConnections", (err, totalConnections) => {
            if (err) {
                console.warn(`Error occurred during increment: ${err}`);
                return;
            }
            console.info(`Total connected clients: ${totalConnections}`);
        });

           let connectionCount=redisClient.get("totalConnections")
           
        if (currentConnections >= MAX_CONNECTIONS) {

            console.warn("You are reached connection limit , please check after a minute : Thank you")

            socket.emit("error", "Too many connections. Please wait and try again after few seconds")
            socket.disconnect()
            setTimeout(() => {
                connectedClients.delete(clientIp)
            }, CONNECTION_TIMEOUT)
            return
        }

        connectedClients.set(clientIp, currentConnections + 1)
        console.warn(`New client connected${clientIp}`)

        //Receive message from client
        socket.on("message", (data) => {
            const result = {
                userId: Math.random(),
                message: data,
                username: "Anonymous",
                currentUser: true,

            }
            //emiting to all connected users
            io.emit("received", result)
        })

        socket.on("disconnect", () => {
            console.log('client disconnected')
            redisClient.decr("totalConnections", (err, totalConnections) => {
                if (err) throw new err
                console.info(`Total connected client : ${totalConnections}`)
            })
        })

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    })


    io.on("error", () => {
        console.log("error ocurred")
    })
}