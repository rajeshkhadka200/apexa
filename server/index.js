import express from "express";
import { connectDB } from "./utils/db.js";
import { connectMindsDB } from "./utils/mindsdb.js";
import cors from "cors";

// import routes
import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import UserRouter from "./router/UserRouter.js";
import YtRouter from "./router/YtRouter.js"

const app = express();

//MiddleWares
app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));

connectDB();
connectMindsDB();

// using the routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", UserRouter);
app.use("/api/yt",YtRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
