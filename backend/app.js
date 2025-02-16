import express from "express"
import cors from "cors"
import user from "./routes/user.js";
import book from "./routes/book.js";
import cart from "./routes/cart.js";
import fav from "./routes/favourite.js";
import order from "./routes/order.js";
import db from "./lib/db.js"; 
import dotenv from "dotenv"
import path from "path"

const app = express();
dotenv.config()
const __dirname = path.resolve();

const PORT = process.env.PORT;
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}))

//Calling Routes
app.use("/api", user);
app.use("/api", book);
app.use("/api", cart);
app.use("/api", fav);
app.use("/api", order);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//SERVER
app.listen(PORT, () => {
  console.log(`Server Started at PORT : ${PORT} `);
  db();
});
