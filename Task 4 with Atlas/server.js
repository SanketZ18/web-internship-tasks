const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- MONGODB CONNECTION ---------- */
mongoose
  .connect(
    "mongodb+srv://SanketZ18:Sanket1800@cluster0.nhqlmgf.mongodb.net/userdb"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------- USER SCHEMA ---------- */
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    age: Number,
    phone: String,
    email: { type: String, unique: true },
    address: String,
    pincode: Number,
    password: String
  })
);

/* ---------- REGISTER ---------- */
app.post("/register", async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.json({ success: false, msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      pincode: req.body.pincode,
      password: hashedPassword
    });

    res.json({ success: true, msg: "Registration successful" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Registration failed" });
  }
});

/* ---------- LOGIN ---------- */
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ success: false, msg: "Invalid email or password" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.json({ success: false, msg: "Invalid email or password" });
    }

    // ❗ Do NOT send password to frontend
    const userData = {
      _id: user._id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      email: user.email,
      address: user.address,
      pincode: user.pincode
    };

    res.json({ success: true, user: userData });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Login error" });
  }
});

/* ---------- UPDATE PROFILE ---------- */
app.put("/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      address: req.body.address,
      pincode: req.body.pincode
    });

    res.json({ success: true, msg: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Update failed" });
  }
});

/* ---------- CHANGE PASSWORD (IMPORTANT) ---------- */
app.post("/change-password", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.json({ success: false, msg: "All fields required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.json({ success: false, msg: "Old password incorrect" });
    }

    if (newPassword.length < 6) {
      return res.json({
        success: false,
        msg: "Password must be at least 6 characters"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, msg: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

/* ---------- DELETE ACCOUNT ---------- */
app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Delete failed" });
  }
});

/* ---------- SERVER ---------- */
app.listen(3000, () => console.log("Server running on port 3000"));
