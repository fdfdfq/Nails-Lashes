const express = require("express");

const router = express.Router();

const serviceController = require("../controllers/serviceController");

// Получить все услуги
router.get("/", serviceController.getAllServices);

// Получить услугу по ID
router.get("/:id", serviceController.getServiceById);

module.exports = router;