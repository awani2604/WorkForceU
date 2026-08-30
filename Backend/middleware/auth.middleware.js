import jwt from "jsonwebtoken";

// This function runs BEFORE the actual route handler.
// It checks: "Did the frontend send a valid login token?"
export function protect(req, res, next) {
  const authHeader = req.headers.authorization; // looks like: "Bearer eyJhbGciOi..."

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not logged in — no token provided" });
  }

  const token = authHeader.split(" ")[1]; // removes the word "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded looks like { sub: "someUserId", role: "customer", iat: ..., exp: ... }
    req.userId = decoded.sub;
    req.userRole = decoded.role;

    next(); // token is valid, move on to the actual route handler
  } catch (error) {
    return res.status(401).json({ message: "Session expired, please log in again" });
  }
}
