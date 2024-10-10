import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import { generateTokenAndCookies } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ error: "Username already exits" });
    }

    if (!name || !username || !password || !confirmPassword || !gender) {
      res.status(400).json({ error: "Please fill all the fields" });
    }
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "password and confrim password must be same" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const profile = gender == "male" ? boyProfile : girlProfile;

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      profilePic: profile,
    });
    await newUser.save();
    generateTokenAndCookies(newUser._id, res);
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error in AuthController:", error);
    res.status(400).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "invalid username" });
    }
    const isPasswordCorrect = bcrypt.compare(password, user?.password || "");

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    generateTokenAndCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in Login", error);
    res.status(400).json({ error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("error in logout : ", error);
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ error: "Please enter User name" });
    }
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      res.status(400).json({ error: "User not found :(" });
    }
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("error in getUser:", error);
    res.status(400).json({ error: error.message });
  }
};
