import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(403).json({ error: true, msg: "Access Denied" });
  }
  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = tokenDetails;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: true, msg: "Token expired" });
    }
    res.status(403).send({ error: true, msg: "Invalid Token" });
  }
};

export default AuthMiddleware;
