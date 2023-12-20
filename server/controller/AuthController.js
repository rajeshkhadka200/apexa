import User from "../model/user.schema.js";
import generateToken from "../utils/generateToken.js";
export const AuthController = async (req, res) => {
  try {
    const { name, email, imageUrl } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const { accessToken, refreshToken } = await generateToken(user._id);
      return res.status(200).json({
        error: false,
        accessToken,
        refreshToken,
        msg: "Login Successfully",
      });
    }
    const newUser = await new User({
      username: name,
      email,
      profilePic: imageUrl,
    }).save();
    const { accessToken, refreshToken } = await generateToken(newUser._id);
    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      msg: "Signup Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};
