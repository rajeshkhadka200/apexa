import User from "../model/user.schema.js";
import UserToken from "../model/userToken.schema.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import Yt from "../model/yt.schema.js";
import blog from "../model/blog.schema.js";

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

//  generate yt history
export const generateYtHistory = async (req, res) => {
  const { user_id } = req.params;
  try {
    const ytHistory = await Yt.find({ user_id });
    if (ytHistory.length === 0) {
      return res.status(204).json({
        error: false,
        msg: "You havent tracked any youtube videos.",
      });
    }
    return res.status(200).json({
      error: false,
      msg: "YT history got",
      history: ytHistory,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Internal server Error",
    });
  }
};
//  generate blog history
export const generateBolgHistory = async (req, res) => {
  const { user_id } = req.params;
  try {
    const blogHistory = await blog.find({ user_id });

    if (blogHistory.length === 0) {
      return res.status(204).json({
        error: false,
        msg: "You havent tracked any blogs.",
      });
    }
    return res.status(200).json({
      error: false,
      msg: "Blog history got",
      history: blogHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Internal server Error",
    });
  }
};
