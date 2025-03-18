const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Resident = require("../model/residentsModel");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { name, flat, email, password } = req.body;

    let user = await Resident.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Resident already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new Resident({ name, flat, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Resident registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Resident.findOne({ email });

    if (!user) return res.status(400).json({ message: "Resident not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, flat: user.flat }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser };
