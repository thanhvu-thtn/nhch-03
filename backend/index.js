//Dotenv
const dotenv = require("dotenv");
dotenv.config();
//--------------------------------------------------
//mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.CNN)
  .then(() => console.log("Connected to Mongodb!"))
  .catch((err) => console.log(err.message));
//--------------------------------------------------
//express
//--------------------------------------------------
const express = require("express");
const app = express();
//Cookie parser
const cookieParser = require("cookie-parser");
// Cors
const cors = require("cors");
//body-parser
const bodyParser = require("body-parser");
// Configure body-parser to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Allows for nested objects in URL-encoded data
//app use
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
let corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
//----------------------------------------------------------
//Server
//----------------------------------------------------------
const monHocRouter = require("./routes/monHocRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
app.use("/v2/monhoc", monHocRouter);
app.use("/v2/user", userRouter);
app.use("/v2/auth", authRouter);
//-----------------------------------------------------------
//listen
//-----------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server đang hoạt động tại cổng ${process.env.PORT}`);
});
