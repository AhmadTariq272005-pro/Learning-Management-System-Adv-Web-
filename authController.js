import User from "../models/User.js";
import bcrypt from "bcryptjs";

export async function signupUser(req, res) {
  try {
    const { name, email, password, role } = req.body ?? {};
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    // Public signup cannot create privileged accounts.
    if (role && role !== "student") {
      return res.status(403).json({ message: "Role can only be assigned by an administrator" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
      role: "student"
    });
    return res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: "Email already exists" });
    if (error?.name === "ValidationError") return res.status(400).json({ message: error.message });
    console.error("signupUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
