import UserToken from "../model/userToken.schema.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import jwt from "jsonwebtoken";

export const getNewToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { error, tokenDetails, msg } = verifyRefreshToken(refreshToken);
    if (error) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: true, msg: "Token expired" });
      }
      return res.status(401).json({ error, msg });
    }
    const { _id } = tokenDetails;
    const payload = { _id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "15m",
      }
    );
    res
      .status(200)
      .json({ error: false, accessToken, msg: "New Access Token created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Server error" });
  }
};

export const getAllTokens = async (req, res) => {
  try {
    const alltokens = await UserToken.find();
    res.status(200).json({ error: false, alltokens, msg: "All tokens" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};