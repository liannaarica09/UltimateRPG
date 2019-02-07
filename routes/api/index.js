const router = require("express").Router();

const authRoutes = require("./auth");

// profile routes
router.use("/auth", authRoutes);

module.exports = router;