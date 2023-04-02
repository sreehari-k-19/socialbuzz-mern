const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000",
        origin: "https://socialbuzz.fun",
    }
})

let activeUsers = []

io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            // console.log("New User Connected", activeUsers);
        }
        console.log("connected suer", activeUsers)
        io.emit("get-users", activeUsers);
    });
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", receiverId)
        console.log("Data: ", data)
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        io.emit("get-users", activeUsers);

    })

})