import UserToken from "../model/userToken.schema.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const token = UserToken.findOne({ token: refreshToken });
    if (!token) {
      return { error: true, msg: "Invalid refresh token" };
    }
    const tokenDetails = jwt.verify(refreshToken, privateKey);
    return { error: false, tokenDetails, msg: "Token verified successfully" };
  } catch (error) {
    return { error: error, msg: "Invalid refresh token" };
  }
};

export default verifyRefreshToken;
