require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");
const multer = require("multer");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const { default: next } = require("next");
//Databse Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected to Server"))
  .catch((err) => console.log(err.stack));

// Login and Logout Rate Limiters
const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts from this IP, please try again later. ",
});
const logoutLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many logout attempts from this IP, please try again later. ",
});

//storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://172.16.2.233:3000",
      "http://172.16.2.242:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

//PASSPORT CONFIGURATION
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return done(null, false, { message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Invalid Username or Password" });
    }

    return done(null, user); // Authentication successful
  })
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user); // Debugging line
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user) {
      return done(null, false); // No user found
    }
    done(null, user); // Attach user to the session
  } catch (error) {
    done(error);
  }
});
app.use(passport.initialize());
app.use(passport.session());

// ROUTES

// Signup Route
app.post(
  "/signup",
  [
    body("username").trim().isLength({ min: 3 }).escape(),
    body("email").isEmail().normalizeEmail(),
    body("fullName").trim().notEmpty().escape(),
    body("password").isLength({ min: 8 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, fullName } = req.body;

    try {
      const existingUser = await pool.query(
        "SELECT user_id FROM users WHERE username=$1 OR email=$2",
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Username or Email already exists" });
      }

      const user_id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `INSERT INTO users (user_id, username, email, full_name, password, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [user_id, username, email, fullName, hashedPassword]
      );

      const user = result.rows[0];
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// Login Route
app.post("/login", loginLimitter, (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error("Login error:", err);
      return next(err);
    }
    if (!user) {
      console.log("Login failed:", info?.message || "No user found");
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials" });
    }

    req.logIn(user, async (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }

      return res.status(200).json({
        message: "Login successful",
        user: { username: user.username, email: user.email }, // send back safe user info
      });
    });
  })(req, res, next); // <-- Important: invoke authenticate
});

//Protected Route
app.get("/protected", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      isAuthenticated: false,
      error: "Unauthorized",
      sessionExists: !!req.session,
    });
  }

  return res.status(200).json({
    isAuthenticated: true,
    userdata: {
      username: req.user.username,
      email: req.user.email,
      attorney: req.user.attorney,
    },
  });
});

// User Details Route
app.get("/user-details", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: "Unauthorized",
      sessionExists: !!req.session,
    });
  }

  return res.status(200).json({
    user_id: req.user.user_id,
    username: req.user.username,
    email: req.user.email,
    attorney: req.user.attorney,
    is_dark: req.user.is_dark,
  });
});

// Logout Route
app.post("/logout", logoutLimitter, async (req, res) => {
  const username = req.user ? req.user.username : "Unknown user";

  // If user is already logged out
  if (!req.isAuthenticated()) {
    console.log(`User "${username}" already logged out.`);
    return res
      .status(200)
      .json({ message: "Already logged out", success: true });
  }

  req.logout(async (err) => {
    if (err) {
      console.error(`Error during logout for user "${username}":`, err);
      return res
        .status(500)
        .json({ error: "Error logging out", success: false });
    }

    req.session.destroy(async (err) => {
      if (err) {
        console.error(`Error destroying session for "${username}":`, err);
        return res
          .status(500)
          .json({ error: "Error clearing session", success: false });
      }

      // Clear session cookie
      res.clearCookie("sessionId", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? "172.16.2.233" : undefined,
      });

      console.log(`User "${username}" successfully logged out.`);
      return res
        .status(200)
        .json({ message: "Logged out successfully", success: true });
    });
  });
});

// LISTENiNG SERVER
app.listen(8000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:8000");
});
