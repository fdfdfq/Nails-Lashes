const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");


// все записи
router.get(
    "/",
    bookingController.getBookings
);


// записи конкретного мастера
// пример: /api/bookings/master/2
router.get(
    "/master/:id",
    bookingController.getMasterBookings
);


// создать запись
router.post(
    "/",
    bookingController.createBooking
);


// изменить статус
// пример: /api/bookings/1/status
router.patch(
    "/:id/status",
    bookingController.updateBookingStatus
);


module.exports = router;