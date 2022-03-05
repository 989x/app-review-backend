const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");

const multer = require("multer")

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(console.log("Connected to MongoDB 🤩"))
    .catch((err) => console.log(err));

// multer

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    }, 
    filename:(req, file, cb) => {
        cb(null, "hello.jpeg");
        // cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

// ---

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen("5000", () => {
    console.log("🔥 Backend is running. 🔥")
})