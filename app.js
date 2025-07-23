require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDb = require('./utils/db');

const orderRouter = require("./routes/order.routes")
const userRouter = require("./routes/user.routes")
const sellerRouter = require("./routes/seller.routes")
const adminRouter = require("./routes/admin.routes")


app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "*",
    credentials : true
}));



app.use("/auth", userRouter)
app.use("/orders", orderRouter)
app.use("/seller", sellerRouter)
app.use("/admin/users", adminRouter)




app.listen(port, () => {
    connectDb();
    console.log(`Server running on port ${port}`);
});