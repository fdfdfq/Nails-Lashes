const db = require("../config/database");


// ===============================
// Получить все записи (OWNER)
// ===============================
const getBookings = async (req, res) => {
    try {

        const result = await db.query(`
            SELECT
                bookings.*,

                masters.name AS master,

                services.name AS service_name,
                services.price,
                services.duration

            FROM bookings

            LEFT JOIN masters
            ON bookings.master_id = masters.id

            LEFT JOIN services
            ON bookings.service_id = services.id

            ORDER BY bookings.id DESC
        `);


        res.json({
            success: true,
            bookings: result.rows
        });


    } catch (error) {

        console.error("GET BOOKINGS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });

    }
};



// ===============================
// Получить записи мастера
// ===============================
const getMasterBookings = async (req, res) => {

    try {

        const masterId = req.params.id;


        const result = await db.query(`

            SELECT
                bookings.*,

                masters.name AS master,

                services.name AS service_name,
                services.price,
                services.duration

            FROM bookings

            LEFT JOIN masters
            ON bookings.master_id = masters.id

            LEFT JOIN services
            ON bookings.service_id = services.id

            WHERE bookings.master_id = $1

            ORDER BY bookings.id DESC

        `, [masterId]);



        res.json({
            success:true,
            bookings: result.rows
        });



    } catch(error){

        console.error("MASTER BOOKINGS ERROR:", error);


        res.status(500).json({
            success:false,
            message:"Ошибка сервера"
        });

    }

};




// ===============================
// Создать запись
// ===============================
const createBooking = async (req,res)=>{

    try {


        const {
            master_id,
            service_id,
            client_name,
            phone,
            birth_date,
            booking_date,
            booking_time,
            comment
        } = req.body;



        const result = await db.query(`

            INSERT INTO bookings
            (
                master_id,
                service_id,
                client_name,
                phone,
                birth_date,
                booking_date,
                booking_time,
                comment,
                status
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,'new'
            )

            RETURNING *

        `,[
            master_id,
            service_id,
            client_name,
            phone,
            birth_date,
            booking_date,
            booking_time,
            comment
        ]);



        res.json({
            success:true,
            booking:result.rows[0]
        });



    } catch(error){


        console.error("CREATE BOOKING ERROR:",error);


        res.status(500).json({
            success:false,
            message:"Ошибка сервера"
        });

    }

};





// ===============================
// Изменить статус записи
// ===============================
const updateBookingStatus = async(req,res)=>{

    try {


        const {id}=req.params;

        const {status}=req.body;



        const result = await db.query(`

            UPDATE bookings

            SET status=$1

            WHERE id=$2

            RETURNING *

        `,[status,id]);



        res.json({
            success:true,
            booking:result.rows[0]
        });



    }catch(error){

        console.error("UPDATE STATUS ERROR:",error);


        res.status(500).json({
            success:false,
            message:"Ошибка сервера"
        });

    }

};





module.exports = {

    getBookings,
    getMasterBookings,
    createBooking,
    updateBookingStatus

};