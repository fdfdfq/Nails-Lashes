const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");



// ==========================
// Мастера
// ==========================


// Добавить мастера
router.post(
    "/masters",
    adminController.createMaster
);


// Удалить мастера
router.delete(
    "/masters/:id",
    adminController.deleteMaster
);




// ==========================
// Аккаунты мастеров
// ==========================


// Создать аккаунт мастера
router.post(
    "/accounts",
    adminController.createAccount
);





// ==========================
// Услуги
// ==========================


// Добавить услугу
router.post(
    "/services",
    adminController.createService
);


// Изменить услугу
router.put(
    "/services/:id",
    adminController.updateService
);


// Удалить услугу
router.delete(
    "/services/:id",
    adminController.deleteService
);



module.exports = router;