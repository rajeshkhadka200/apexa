import express from "express";
import { connectDB } from "./utils/db.js";
import cors from "cors";

// import routes
import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import userRoutes from "./router/UserRouter.js";

const app = express();

//MiddleWares
app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));

connectDB();

// using the routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
