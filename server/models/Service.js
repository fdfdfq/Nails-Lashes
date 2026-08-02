const db = require("../config/database");

class Service {

    // Получить все услуги
    static async getAll() {

        const result = await db.query(`
            SELECT *
            FROM services
            ORDER BY id ASC
        `);

        return result.rows;

    }

    // Получить услуги конкретного мастера
    static async getByMaster(masterId) {

        const result = await db.query(
            `
            SELECT *
            FROM services
            WHERE master_id = $1
            ORDER BY id ASC
            `,
            [masterId]
        );

        return result.rows;

    }

    // Получить услугу по ID
    static async getById(id) {

        const result = await db.query(
            `
            SELECT *
            FROM services
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];

    }

}

module.exports = Service;