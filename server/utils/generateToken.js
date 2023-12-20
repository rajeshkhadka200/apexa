import jwt from "jsonwebtoken";
import UserToken from "../model/userToken.schema.js";

const generateToken = async (id) => {
  try {
    const payload = { _id: id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "15min",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );
    const userToken = await UserToken.findOne({ userId: id });
    console.log(userToken);
    if (userToken) {
      await userToken.deleteOne();
    }
    await new UserToken({ userId: id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default generateToken;
