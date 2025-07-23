require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

const connectDb = require('./utils/db');

const orderRouter = require("./routes/order.routes");
const userRouter = require("./routes/user.routes");
const sellerRouter = require("./routes/seller.routes");
const adminRouter = require("./routes/admin.routes");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.locals.io = io;

// Routes
app.use("/auth", userRouter);
app.use("/orders", orderRouter);
app.use("/seller", sellerRouter);
app.use("/admin/users", adminRouter);

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected, socket id:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected, socket id:', socket.id);
    });
});

// Start server
server.listen(port, () => {
    connectDb();
    console.log(`Server running on port ${port}`);
});
