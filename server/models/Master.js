const db = require("../config/database");

class Master {

    static async getAll() {

        const result = await db.query(`
            SELECT *
            FROM masters
            ORDER BY id ASC
        `);

        return result.rows;

    }

    static async getById(id) {

        const result = await db.query(
            `
            SELECT *
            FROM masters
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];

    }

}

module.exports = Master;