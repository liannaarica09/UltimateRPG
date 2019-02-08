const router = require("express").Router();

const authRoutes = require("./auth");

const userRoutes = require("./profiles");

// profile routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;