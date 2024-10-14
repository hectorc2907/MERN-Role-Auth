import express from "express";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("test"));

app.listen(4000, () => {
  console.log("listen on port 4000");
});
