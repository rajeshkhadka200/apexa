import bot from "./utils/bot.js";
import { connectDB } from "./utils/db.js";

const dbConnected = await connectDB();

if (dbConnected) {
  setInterval(bot,10000);
}
