import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
dotenv.config();

// this sets everytime you hit / it woould only work if it has /posts before it 
app.use("/posts", postRoutes);

app.get("/", (req, resp) => {
    resp.send("<h1>This is memories server.</h1>");
});
// connecting to atlas
// const CONNECTION_URL = "mongodb+srv://voldemort:7378765387@cluster0.yzmsh.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;  

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch( (error) => console.log(error));

mongoose.set('useFindAndModify', false);
console.log("Yessirr!");