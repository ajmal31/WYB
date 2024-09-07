Steps to Run the Project
------------------------
1. Clone the repository:git clone https://github.com/ajmal31/WYB.git
2. Install the required dependencies: npm install
3. Install Redis server or run the following command if you have Docker: "docker run --name redis -p 6379:6379 -d redis"
4. To scale servers based on your system requirements (optional), run: "pm2 start npm --name "websocket-server" -- run start -i max"
5. Check application logs: "pm2 logs"
6. To stop all WebSocket servers: "pm2 stop websocket-server"
7. To delete all WebSocket servers: "pm2 delete websocket-server"

Requirements
------------
Node.js
npm
Docker (optional; if you want to run Redis in a Docker container)
Redis


Note:If a single user makes more than 3 connection requests within 1 hour, they will only be able to make another request after a 3-minute cooldown period.