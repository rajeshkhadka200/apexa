import express from "express";
import { connectDB } from "./utils/db.js";
import { connectMindsDB } from "./utils/mindsdb.js";
import cors from "cors";

// import routes
import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import UserRouter from "./router/UserRouter.js";
import YtRouter from "./router/YtRouter.js";
import HashnodeRouter from "./router/HashnodeRouter.js";
import ImageRouter from "./router/ImageRouter.js";
import Recomander from "./router/ContentRouter.js";

const app = express();

//MiddleWares
app.use(express.json());
app.use(cors("Access-Control-Allow-Origin", "*"));
app.use(express.urlencoded({ extended: false }));

connectDB();
connectMindsDB();

// using the routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", UserRouter);
app.use("/api/yt", YtRouter);
app.use("/api/hashnode", HashnodeRouter);
app.use("/api/image", ImageRouter);
app.use("/api/content", Recomander);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
