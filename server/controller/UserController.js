import User from "../model/user.schema.js";
import UserToken from "../model/userToken.schema.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password-__v");
    if (!user) {
      return res.status(404).json({ error: true, msg: "User not found!" });
    }
    res.status(200).json({ error: false, user, msg: "User data extracted" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

export const userLogout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { error, tokenDetails, msg } = verifyRefreshToken(refreshToken);
    if (error) {
      return res.status(401).json({ error, msg });
    }
    const { _id } = tokenDetails;
    const deletedToken = await UserToken.findOne({ userId: _id });
    if (!deletedToken) {
      return res.status(404).json({ error: true, msg: "Token not found" });
    }
    await deletedToken.deleteOne();
    res.status(200).json({ error: false, msg: "Token deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};
