const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class MakananService {
    constructor() {
        this._pool = new Pool();
    }

    async addMakanan({makanan, kategori_id}) {
        await this.verifyNewMakanan(makanan);
        
        const query = {
            text: 'INSERT INTO makanan (makanan, kategori_id) VALUES($1, $2) RETURNING id',
            values: [makanan, kategori_id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("Makanan gagal ditambahkan");
        };

        return result.rows[0].id
    }

        async verifyNewMakanan(makanan) {
        const query = {
            text: 'SELECT makanan FROM makanan WHERE makanan = $1',
            values: [makanan],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan makanan. Makanan sudah digunakan');
        }
    }

    
    async getAllMakanan() {
        const result = await this._pool.query('SELECT id, makanan, kategori_id FROM makanan');
        return result.rows;
    }

    async getMakananByKategoriNama(namaKategori) {
        const query = {
            text: `
                SELECT m.id, m.makanan, k.nama AS kategori
                FROM makanan m
                JOIN kategori_makanan k ON m.kategori_id = k.id
                WHERE k.nama = $1
            `,
            values: [namaKategori],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }

    async getAllDataMakananKategori() {
    const result = await this._pool.query(`
        SELECT 
            m.id,
            m.makanan,
            k.nama AS kategori
        FROM 
            makanan m
        JOIN 
            kategori_makanan k
        ON 
            m.kategori_id = k.id
    `);

    return result.rows;
}


    async getAllDataMakananDanKategori() {
        const makananResult = await this._pool.query('SELECT * FROM makanan');
        const kategoriResult = await this._pool.query('SELECT * FROM kategori_makanan');

        return {
            makanan: makananResult.rows,
            kategori_makanan: kategoriResult.rows
        };
    }

    async getMakananById(makananId) {
        const query = {
            text: 'SELECT id, makanan FROM makanan WHERE id = $1',
            values: [makananId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Makanan tidak ditemukan");
            
        }

        return result.rows[0];
    }

    async editMakananById(id, {makanan, kategori_id}) {
        const query = {
            text: 'UPDATE makanan SET makanan = $1, kategori_id = $2 WHERE id = $3 RETURNING id',
            values: [makanan, kategori_id, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Gagal memperbarui makanan. Id tidak ditemukan");
            
        }
    }

    async deleteMakananById(id) {
        const query = {
            text: 'DELETE FROM makanan WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Makanan gagal dihapus. Id tidak ditemukan')
        }

        return result.rows[0].id;
    }

    async deleteMakananByKategoriNama(namaKategori) {
        const query = {
            text: `
                DELETE FROM makanan
                WHERE kategori_id = (
                    SELECT id FROM kategori_makanan WHERE nama = $1
                )
            `,
            values: [namaKategori],
        };

        await this._pool.query(query);
    }
};

module.exports = MakananService;