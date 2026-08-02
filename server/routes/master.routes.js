const express = require("express");
const router = express.Router();

const masterController = require("../controllers/masterController");

// Получить всех мастеров
router.get("/", masterController.getAllMasters);

// Получить одного мастера
router.get("/:id", masterController.getMasterById);

module.exports = router;