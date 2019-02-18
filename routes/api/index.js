const router = require("express").Router();

const authRoutes = require("./auth");

const charRoutes = require("./chars");

const profileRoutes = require("./profiles");

// profile routes
router.use("/auth", authRoutes);

router.use("/chars", charRoutes);

router.use("/users", profileRoutes);

module.exports = router;
