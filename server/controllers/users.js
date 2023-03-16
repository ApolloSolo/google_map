const { User, Token } = require("../models/index");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const getUsers = async (req, res, next) => {
  try {
    const cookie = req.cookies["token"];
    console.log(cookie);
    const users = await User.find({}).select("-__v -password");
    if (!users) {
      res.status(404).json({
        error: true,
        success: false,
        message: "No users could not be found.",
      });
    }
    res
      .status(200)
      .json({ error: false, success: true, data: { user_data: users } });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.user._id).select(
      "-__v -password"
    );
    if (!foundUser) {
      res.status(404).json({
        error: true,
        success: false,
        message: "This user could not be found.",
      });
    } else {
      res
        .status(200)
        .json({ error: false, success: true, data: { user_data: foundUser } });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPass } = req.body;

    if (!username || !email || !password || !confirmPass) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    if (password !== confirmPass) {
      res.status(400);
      throw new Error("Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }

    const newUser = await User.create(req.body);

    if (!newUser) {
      res.status(400);
      throw new Error("Invalid user data");
    }

    const token = await generateToken(newUser);

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      logged_in: true,
      token,
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(404);
      throw new Error("Incorrect credentials");
    }

    const correctPassword = await foundUser.isCorrectPassword(password);

    if (!correctPassword) {
      res.status(401);
      throw new Error("Incorrect credentials");
    }

    const token = await generateToken(foundUser);

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({
      _id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      logged_in: true,
      token,
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res, next) => {
  const token = req.cookies["token"];
  res.cookie("token", token, { httpOnly: true, maxAge: 0 });
  res.status(202).send({
    success: true,
    error: false,
    message: "Logout Successful",
    logged_in: false,
  });
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    if (newPassword !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords don't match");
    }

    /*  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Current password is incorrect");
    } */

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Changed password" });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const emailPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      res.status(404);
      throw new Error("Not a valid user email");
    }

    // Delete token if exits in DB for user
    let token = await Token.findOne({ userId: user._id });

    if (token) await Token.deleteOne({ _id: token._id });

    // Create Reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    // Hash token and save to db
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to user in DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), // 60 minutes
    }).save();

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
    <h2>Hello ${user.username}</h2>
    <p>You have requested a password reset.</p>
    <p>The reset link is valid for 30 minutes.</p>
    <p>Please use the link to reset your password.</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Thank you,</p>
    <p>AppSolo Tech.</p>
    `;

    const subject = `Password Reset Request`;
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, message, send_to, sent_from);

    res
      .status(202)
      .json({ error: false, success: true, message: "Reset email sent" });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword, confirmPassword } = req.body;
    console.log(newPassword, confirmPassword);
    if (!newPassword || !confirmPassword) {
      throw new Error("Please complete all fields.");
    } else if (newPassword !== confirmPassword) {
      throw new Error("Passwords don't match.");
    }

    // Hash resetToken from link then compare it to DB token

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Get DB token
    const dbToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    console.log(dbToken);

    if (!dbToken) {
      throw new Error("Invalid or expired reset token.");
    }

    // Find user
    const user = await User.findOne({ _id: dbToken.userId });

    user.password = newPassword;
    await user.save();

    await Token.findByIdAndDelete(dbToken._id);

    res.status(201).json({
      error: false,
      success: true,
      message: "Password reset successful. Please login.",
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const editUserData = async (req, res) => {
  try {
    const { _id } = req.user._id;
    const body = req.body;

    console.log(body);

    const updatedUser = await User.findByIdAndUpdate(_id, body, {
      new: true,
    }).select("-__v -password");

    if (!updatedUser) {
      res.status(404);
      throw new Error("User could not be found");
    }

    res.send(updatedUser);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  registerUser,
  login,
  logout,
  editUserData,
  changePassword,
  emailPasswordReset,
  resetPassword,
};
