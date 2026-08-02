const db = require("../config/database");

class Booking {


    // Создать запись
    static async create(data) {

        const {
            client_name,
            phone,
            service_id,
            master_id,
            booking_date,
            booking_time
        } = data;


        const result = await db.query(
            `
            INSERT INTO bookings
            (
                client_name,
                phone,
                service_id,
                master_id,
                booking_date,
                booking_time
            )

            VALUES ($1,$2,$3,$4,$5,$6)

            RETURNING *;
            `,
            [
                client_name,
                phone,
                service_id,
                master_id,
                booking_date,
                booking_time
            ]
        );


        return result.rows[0];

    }



    // Получить все записи
    static async getAll() {


        const result = await db.query(
            `
            SELECT

                b.*,

                s.name AS service_name,

                m.name AS master_name


            FROM bookings b


            LEFT JOIN services s

            ON b.service_id = s.id



            LEFT JOIN masters m

            ON b.master_id = m.id



            ORDER BY 

                booking_date ASC,

                booking_time ASC;

            `
        );


        return result.rows;

    }




    // Получить запись по ID
    static async getById(id) {


        const result = await db.query(
            `
            SELECT *

            FROM bookings

            WHERE id = $1;

            `,
            [id]
        );


        return result.rows[0];

    }





    // Изменить статус записи
    static async updateStatus(id, status) {


        const result = await db.query(
            `
            UPDATE bookings

            SET status = $1

            WHERE id = $2

            RETURNING *;

            `,
            [
                status,
                id
            ]
        );


        return result.rows[0];

    }





    // Удалить запись
    static async delete(id) {


        await db.query(
            `
            DELETE FROM bookings

            WHERE id = $1;

            `,
            [id]
        );


    }


}


module.exports = Booking;