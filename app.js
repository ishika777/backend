require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDb = require('./utils/db');

const userRouter = require("./routes/user.routes")

const corsOption = {
    origin : process.env.FRONTEND_URL,
    credentials : true
}

app.use(bodyParser.json({limit : "10mb"}));
app.use(express.urlencoded({extended : true, limit : "10mb"}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));


app.use("/api/user", userRouter)



app.listen(port, () => {
    connectDb();
    console.log(`Server running on port ${port}`);
});