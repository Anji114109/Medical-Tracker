const User = require("C://Users//ambat//OneDrive//Documents//projects//medicineRemainder//mernproject//backend//models//User");

// Register user
exports.register = async (req, res) => {
  const { name, age, gender, phone, email, password  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = new User({ name, age, gender, phone, email, password });
    await newUser.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user && password) {
      return res.status(400).json({ message: "Sign up first" });
    }
    if (user && user.password !== password) {
      return res.status(401).json({ message: "Password incorrect" });
    }
    if (!user) {
      return res.status(401).json({ message: "Email incorrect" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
