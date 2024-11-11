const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
    });

    // Save the user to DB
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/all" , async (req , res)=>{
  
  try {
    const alldata =await User.find()
    res.status(200).json(alldata)
  } catch (error) {
    res.status(500).json(error)
    
  }
})

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30min',
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Endpoint to send OTP to email
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists, if not create one
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    // Generate OTP (6-digit random number)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash OTP before saving
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save OTP and expiration time (e.g., 5 minutes)
    user.otp = hashedOtp;
    user.otpExpiration = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    await user.save();

    // Send OTP to user's email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email' });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
});

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check if OTP matches and has not expired
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (isOtpValid && Date.now() < user.otpExpiration) {
      // Clear OTP after successful verification
      user.otp = null;
      user.otpExpiration = null;
      await user.save();

      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
});

module.exports = router;