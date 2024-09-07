1. git clone https://github.com/ajmal31/WYB.git
2. npm install
3. install redis server or run this command if you have docker ("docker run --name redis -p 6379:6379 -d redis")
4. Run this command for expand servers as per your system requirements ( optional ) : "pm2 start npm --name "websocket-server" -- run start -i max"
5. for checking Application logs (pm2 logs)
6. for stoping all websocket-servers ("pm2 stop websocket-server")
7. for delete all websocket-servers ("pm2 delete websocket-server")


* if single make connection request 3 times in a 1 hour only he/she able to connect after 3 minutes.
