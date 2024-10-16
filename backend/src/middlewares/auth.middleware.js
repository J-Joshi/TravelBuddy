import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  if (!token) {
    console.log("token not verified");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email; // Extract the email from the token payload
    console.log("token verified");
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
